import React, { Fragment, useState, useEffect, useCallback } from "react";
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
