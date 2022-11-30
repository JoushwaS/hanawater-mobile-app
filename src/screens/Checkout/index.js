import React, { Fragment, useState, useEffect, useCallback } from "react";
import { NativeModules } from "react-native";
import Screen from "./screen";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils";
import { getCartTotal } from "../../config/api/cart";
import { getPaymentStatus, requestCheckoutID } from "../../config/api/payment";
import Navigator from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { checkout } from "../../config/api/orders";
import { addCartBulk } from "../../config/api/cart";
import { getAddressList } from "../../config/api/auth";
import { useFocusEffect } from "@react-navigation/native";

import { store } from "../../store";

import { clearCart, cartTotal } from "../../store/actions";
import { useTranslation } from "react-i18next";

function Index(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [cardType, setCardType] = useState("");

  const [orderLoading, setOrderLoading] = useState(false);
  const [coupon, setCouponCode] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressList, setaddressList] = useState([]);
  const [cardModal, setCardModal] = useState(false);
  const [transactionResultResponse, settransactionResultResponse] =
    useState("");

  const [totalData, setTotal] = useState({
    freeDelivery: {
      isFree: false,
      percentage: "0",
      remainingAmount: "0",
      requiredAmount: 0,
    },
    totals: [],
  });
  const { items, totals } = useSelector((state) => state.cart);
  const { customer, codes } = useSelector((state) => state.auth);

  const getData = async (coupon) => {
    try {
      const body = {
        items: items.map((i) => {
          if (i?.subscription) {
            return {
              itemId: i.productId || i.id || i.itemId,
              quantity: i.quantity,
              subscription: i.subscription,
            };
          } else {
            return {
              itemId: i.productId || i.id || i.itemId,
              quantity: i.quantity,
            };
          }
        }),
      };
      if (coupon) {
        body["coupon"] = {
          code: coupon,
          action: "apply",
        };
      }
      setLoading(true);
      const { data: cartData } = await getCartTotal(body);
      const { data: address } = await getAddressList();

      setaddressList(address?.data);
      // console.log("cartData==>", cartData);
      dispatch(cartTotal(cartData?.data?.totals));
      if (coupon) {
        // console.log("coupon", coupon);
        if (cartData?.data?.coupon?.isValid) {
          showToast({
            text: t("Discount Applied"),
            type: "success",
          });
          setCouponValid(true);
        } else {
          showToast({
            text: t("Coupon Code is invalid"),
            type: "error",
          });
          setCouponCode("");
          setCouponValid(false);
        }
      }

      const { freeDelivery, totals } = cartData?.data;
      setTotal({
        freeDelivery,
        totals,
      });
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      showToast({
        text: error?.response?.data?.message || error.message,
        type: "error",
      });
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  //First Step
  const handlePlaceOrder = async (addressDetails, paymentmode) => {
    if(!addressDetails){
      //
      showToast({ text:t("No Address Selected"), type:"error" });
      return;
    }
    if(!paymentmode){
      showToast({ text:t("No Payment Method Selected"), type:"error" });
      return;
    }

    console.log("paymentmode", paymentmode);
    console.log("addressDetails", addressDetails);
    console.log("cardType", cardType);

    let successCheckout = false;
    let paymentMethod = null;
    if (paymentmode === 0 || paymentmode === 1 || paymentmode === 2) {
      paymentMethod = 'credit_card';
      successCheckout = await new Promise((resolve, reject)=>{
        Navigator.navigate(SCREENS.WEBPAYMENT_SCREEN, {addressDetails,coupon,cardType, callback: (result)=>{
           resolve(result);
        }});
      });

    } else if (paymentmode === 3) {
      paymentMethod = 'applepay';
      successCheckout = await onCheckOutApplepay(addressDetails);

    } else {
      //cash on delivery
      paymentMethod = 'cod';
      successCheckout = { trackId : "N/A"};
    }
    //successCheckout = { trackId: "delibrately checkout" }
    if(successCheckout){
      let successOrder = await placeOrder(successCheckout.trackId,paymentMethod,addressDetails);

      if(successOrder){
        showToast({text: t("Order Placed Successfully"),type: "success",});

        Navigator.navigate(SCREENS.THANK_YOU, {orderId: successOrder.orderId});
      } else {
        showToast({text: t("Unable to place order"),type: "error"});
      }
    }

  };
  
  //Second Step
  const onCheckOutApplepay = async (addressDetails) => {
    try {
      let amount = store.getState().cart.total[store.getState().cart.total.length - 1]?.price;
      let paymentSession = await createPaymentSession('applepay',amount,addressDetails);

      if(!paymentSession){
        //Error
        showToast({ text:t("Unable to create Payment Session"), type:"error" });
        return null;
      }
      const paymentParams = {
        checkoutID: paymentSession.id,
        amount:amount
      };
   

      let  transactionResult = await NativeModules.Hyperpay.applepayPayment(paymentParams);
         
      if (transactionResult) {
    
        console.log("Apple pay result ", transactionResult);
        //resourcePath = "?checkoutId=" + transactionResult.checkoutId + "&cardType="+ this.state.paymentType[3].icon_name;
        //this.getPaymentStatus(resourcePath);
      
        
        if (transactionResult.status !== "completed") {
          //Failed
          showToast({ text:t("Applepay : Unable to process"), type:"error" });
          return null;
        }

        const paymentStatus = await checkPaymentStatus(transactionResult.checkoutId);

        const { merchantTransactionId } = paymentStatus;

        if(!merchantTransactionId){
          //Failed
          showToast({ text:t("Applepay : Unable to process Payment"), type:"error" });
          return null;
        }

        let statusCode = paymentStatus.result.code;
        let description = paymentStatus.result.description;
        let trackId =  paymentStatus.result.id;
        
        return { status: 'success', statusCode, description, trackId};
      }
    } catch (e) {
      console.log("06", "error", e);
      showToast({ text:t("Unable to create Payment Session"), type:"error" });
      return null;
    }
  };

  //Third Step
  let createPaymentSession = async (cardType,amount,addressDetails) => {
    const splitAddress = addressDetails.area.split(",");
    let requestObj = {
      amount:amount,
      card_type: cardType,
      address: {
        city: addressDetails?.city || "N/A",
        street: splitAddress[splitAddress.length - 1] || "N/A",
        state: splitAddress[splitAddress.length - 1] || "N/A",
      },
    };
    let result = await requestCheckoutID(requestObj,cardType);

    if(!result.success){
      console.log("Payment session error",result.error);
      return null;
    }
    
    console.log("Payment session", result.data);
    return result.data;
  };

  //Fourth Step
  const checkPaymentStatus = async (checkoutId) => {
  
      let responseJson = await getPaymentStatus(checkoutId,'applepay');
   
      settransactionResultResponse(responseJson);
      
      const successPattern = /^(000\.000\.|000\.100\.1|000\.[36])/;
      const manuallPattern = /^(000\.400\.0[^3]|000\.400\.100)/;
      const match1 = successPattern.test(responseJson.data.result.code);
      const match2 = manuallPattern.test(responseJson.data.result.code);
     
      let isSuccess = responseJson.success //match1 || match2;

      console.log("Payment status : ", isSuccess, responseJson);
      return isSuccess;
  };

  //Fifth Step - Final
  const placeOrder = async (trackId,paymentMethod,addressDetails) =>{
    console.log("IN placeOrder",trackId,paymentMethod,addressDetails);
    try {
      setOrderLoading(true);
      var isMosque = items.findIndex((val) => {
        return val?.showMosque;
      });
      var orderObj;
      if (isMosque > -1) {
        orderObj = {
          customerId: customer.id,
          order: {
            firstName: customer.firstName || "-",
            lastName: customer.lastName || "-",
            email: customer.email || "-",
            phone: customer.phone || "-",
            paymentMethod: paymentMethod,
            deliveryTime: "Morning",
            comments: "Order Placed from Mobile app",
            orderStatusId: 1,
            trackId: trackId,
            orderTotals: store.getState().cart.total,
            shippingAddress: {
              fullAddress: items[isMosque]?.mosque?.fullAddress,
              lat: items[isMosque]?.mosque?.lat,
              lng: items[isMosque]?.mosque?.lng,
              area: items[isMosque]?.mosque?.city,
              city: items[isMosque]?.mosque?.city,
              comment: "",
            },
            paymentAddress: {
              fullAddress: items[isMosque]?.mosque?.fullAddress,
              lat: items[isMosque]?.mosque?.lat,
              lng: items[isMosque]?.mosque?.lng,
              area: items[isMosque]?.mosque?.city,
              city: items[isMosque]?.mosque?.city,
              comment: "",
            },
          },
        };
      } else {
        orderObj = {
          customerId: customer.id,
          order: {
            firstName: customer.firstName || "-",
            lastName: customer.lastName || "-",
            email: customer.email || "-",
            phone: customer.phone || "-",
            paymentMethod: paymentMethod,
            deliveryTime: "Morning",
            comments: "Order Placed from Mobile app",
            orderStatusId: 1,
            trackId: trackId,
            orderTotals: store.getState().cart.total,
            shippingAddress: {
              fullAddress: addressDetails?.fullAddress,
              lat: addressDetails?.lat,
              lng: addressDetails?.lng,
              area: addressDetails?.area,
              city: addressDetails?.city,
              comment: "",
            },
            paymentAddress: {
              fullAddress: addressDetails?.fullAddress,
              lat: addressDetails?.lat,
              lng: addressDetails?.lng,
              area: addressDetails?.area,
              city: addressDetails?.city,
              comment: "",
            },
          },
        };
      }

      let cartItems = [];
      items.map((item) => {
        console.log("bulk add item", item);
        if (item.id || item?.itemId) {
          if (item?.subscription) {
            cartItems.push({
              itemId: item.id,
              quantity: item.quantity,
              customFields: {
                subscription: item?.subscription,
              },
            });
          } else {
            cartItems.push({
              itemId: item.id,
              quantity: item.quantity,
            });
          }
        }
      });

      // console.log("itemsitems==", cartItems);

      const { data: _data } = await addCartBulk(
        customer?.id,
        { items: cartItems },
        codes.accessToken
      );

      const checkoutResponse = await checkout(orderObj, codes.accessToken);
      console.log("checkoutResponse",checkoutResponse.data);
      setOrderLoading(false);
      dispatch(clearCart());
      
      let orderId = checkoutResponse.data.id;
      return { orderId };
    } 
    catch (error) {
      console.log("Place order Exception", error);
      setOrderLoading(false);
      return false;
    }
  }
  

  const handleApplyCoupon = () => {
    if (coupon.length > 1) {
      setModalVisible(false);
      getData(coupon);
      // setCouponCode("");
    }
  };

  

  return (
    <Fragment>
      <Header
        text={t("payment_and_address")}
        fromOTP={props.route?.params?.fromOTP}
        backButton
      />
      <Screen
        handleApplyCoupon={handleApplyCoupon}
        isLoading={isLoading}
        totalData={totalData}
        couponCode={coupon}
        getRefreshData={getData}
        refreshing={refreshing}
        setCouponCode={setCouponCode}
        addressList={addressList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handlePlaceOrder={handlePlaceOrder}
        orderLoading={orderLoading}
        cardType={cardType}
        setCardType={setCardType}
        couponValid={couponValid}
        setCouponValid={setCouponValid}
        cardModal={cardModal}
        setCardModal={setCardModal}
        {...props}
      />
    </Fragment>
  );
}

export default Index;
