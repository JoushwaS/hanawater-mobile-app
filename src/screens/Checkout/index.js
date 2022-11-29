import React, { Fragment, useState, useEffect, useCallback } from "react";
import { NativeModules } from "react-native";
import Screen from "./screen";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils";
import { getCartTotal } from "../../config/api/cart";
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

  generateCheckoutId = async () => {
    const cartTotal = parseFloat(
      store.getState().cart.total[store.getState().cart.total.length - 1]?.price
    );
    let requestObj = {
      amount:
        store.getState().cart.total[store.getState().cart.total.length - 1]
          ?.price,
      card_type: "applepay",
      address: {
        street: "str1",
        city: "Jeddah",
        state: "stat1",
      },
    };
    let data = await fetch(
      "http://3.135.102.9:9127/api/v1/payment/request-checkout",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer 214065d12b1fd596c0b38b5d3dc671d45ce21a15",
        },
        body: JSON.stringify(requestObj),
      }
    );
    let data_json = await data.json();
    console.log("01 generateCheckoutId() ", data_json);
    return data_json;
  };
  const getPaymentStatus = async (resourcePath) => {
    try {
      console.log("resourcePath", resourcePath);
      let url =
        "http://3.135.102.9:9127/api/v1/payment/status?checkoutId=" +
        resourcePath +
        "&cardType=applepay";
      //let url = "https://dev.hyperpay.com/hyperpay-demo/getpaymentstatus.php?id="+ resourcePath
      console.log("01", url);

      let response = await fetch(url);
      let responseJson = await response.json();
      console.log("02", "responseJson", responseJson);
      settransactionResultResponse(responseJson);
      const successPattern = /^(000\.000\.|000\.100\.1|000\.[36])/;
      const manuallPattern = /^(000\.400\.0[^3]|000\.400\.100)/;
      const match1 = successPattern.test(responseJson.result.code);
      const match2 = manuallPattern.test(responseJson.result.code);
      console.log("03", match1, match2);

      if (match1 || match2) {
        this.props.navigation.navigate("ThankYou");
      } else {
      }
      // console.log(
      //   "04",
      //   "responseJson",
      //   responseJson.result.code,
      //   match2,
      //   match1
      // );

      return JSON.stringify(responseJson);
    } catch (e) {
      console.log("error", r);
    }
  };
  onCheckOutApplepay = async (addressDetails) => {
    try {
      let checkoutData = await generateCheckoutId();

      let {
        data: { id },
      } = checkoutData;
      if (id) {
        // console.log("cart total>>",)
        const cartTotal = parseFloat(
          store.getState().cart.total[store.getState().cart.total.length - 1]
            ?.price
        );

        const paymentParams = {
          checkoutID: id,
          amount:
            store.getState().cart.total[store.getState().cart.total.length - 1]
              ?.price,
        };
        // console.log(
        //   "01",
        //   "transactionResult",
        //   id,
        //   paymentParams,
        //   NativeModules.Hyperpay
        // );

        NativeModules.Hyperpay.applepayPayment(paymentParams)
          .then(async (transactionResult) => {
            if (transactionResult) {
              // console.log(
              //   "02",
              //   "transactionResult from hyperpay",
              //   transactionResult
              // );
              console.log(" trans_result>>", transactionResult);
              //resourcePath = "?checkoutId=" + transactionResult.checkoutId + "&cardType="+ this.state.paymentType[3].icon_name;
              //this.getPaymentStatus(resourcePath);
              const resultPayStatus = await getPaymentStatus(
                transactionResult.checkoutId
              );

              const { merchantTransactionId } = JSON.parse(resultPayStatus);
              console.log("merchantTransactionId>>", merchantTransactionId);
              if (transactionResult.status === "completed") {
                const trackID =
                  merchantTransactionId + "::" + transactionResult.checkoutId;
                console.log("trackID>>>>", trackID);
                // console.log("here");
                // return;
                let orderObj = {
                  customerId: customer.id,
                  order: {
                    firstName: customer.firstName || "-",
                    lastName: customer.lastName || "-",
                    email: customer.email || "-",
                    phone: customer.phone || "-",
                    paymentMethod: "apple-pay",
                    deliveryTime: "Morning",
                    comments: "Order Placed from Mobile app",
                    orderStatusId: 1,
                    trackId: trackID,
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

                console.log("codes.accessToken", codes.accessToken);
                // return;
                const { data } = await checkout(orderObj, codes.accessToken);
                // .then((res) => {

                // })
                // .catch((err) => {
                //   console.log("err>>>>>", err);
                //   setOrderLoading(false);
                //   showToast({
                //     text: err?.response?.data?.message || err.message,
                //     type: "error",
                //   });
                // });
                console.log("data>>>>>", data.data);
                setOrderLoading(false);
                dispatch(clearCart());
                showToast({
                  text: t("Order Placed Successfully"),
                  type: "success",
                });
                if (data?.success) {
                  Navigator.navigate(SCREENS.THANK_YOU, {
                    orderId: data?.data?.id || "",
                  });
                }
                console.log("_data==>", data);
                // console.log("data==>", data);

                //resourcePath = encodeURIComponent("?checkoutId=" + transactionResult.checkoutId + "cardType="+ this.state.paymentType[3].icon_name);
                //this.getPaymentStatus(resourcePath);

                // getPaymentStatus(transactionResult.checkoutId);
              } else {
              }
            }
          })
          .catch((err) => {
            console.log("05", "toStringtoString", err);
          });
      }
    } catch (e) {
      console.log("06", "error", e);
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.length > 1) {
      setModalVisible(false);
      getData(coupon);
      // setCouponCode("");
    }
  };

  const handlePlaceOrder = async (addressDetails, paymentmode) => {
    console.log("paymentmode", paymentmode);
    console.log("addressDetails", addressDetails);
    console.log("cardType", cardType);
    if (paymentmode === 0 || paymentmode === 1 || paymentmode === 2) {
      Navigator.navigate(SCREENS.WEBPAYMENT_SCREEN, {
        addressDetails,
        coupon,
        cardType,
      });
    } else if (paymentmode === 3) {
      await onCheckOutApplepay(addressDetails);
    } else {
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
              paymentMethod: "cod",
              deliveryTime: "Morning",
              comments: "Order Placed from Mobile app",
              orderStatusId: 1,
              trackId: "",
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
              paymentMethod: "cod",
              deliveryTime: "Morning",
              comments: "Order Placed from Mobile app",
              orderStatusId: 1,
              trackId: "",
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

        const { data } = await checkout(orderObj, codes.accessToken);
        // console.log("_data==>", _data);
        // console.log("data==>", data);
        setOrderLoading(false);
        dispatch(clearCart());
        showToast({
          text: t("Order Placed Successfully"),
          type: "success",
        });

        Navigator.navigate(SCREENS.THANK_YOU, {
          orderId: data?.data?.id || "",
        });
      } catch (error) {
        setOrderLoading(false);
        showToast({
          text: error?.response?.data?.message || error.message,
          type: "error",
        });
      }
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
