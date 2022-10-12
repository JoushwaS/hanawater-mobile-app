import React from "react";
import { TouchableOpacity, View, FlatList, Image } from "react-native";
import { Text, CustomButton, IconButton, Card } from "../../components";
import { styles } from "./styles";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { IMAGES } from "../../assets/images";
import { Colors, Fonts } from "../../config/theme";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { store } from "../../store";
import { checkout, paymentByCard } from "../../config/api/orders";
import { WebView } from "react-native-webview";
import { useRef } from "react";
import config from "../../config/api/config";
import { showToast } from "../../utils";
import { clearCart } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { addCartBulk } from "../../config/api/cart";
import { useTranslation } from "react-i18next";
import metrix from "../../config/metrix";
function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const { t } = useTranslation();

  const { items, totals } = useSelector((state) => state.cart);
  const { customer, codes } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [url, setPaymentUrl] = useState(null);
  const webview = useRef(null);
  useEffect(() => {
    const { addressDetails, cardType } = props?.route?.params;
    const splitAddress = addressDetails.area.split(",");
    // console.log("addressDetails", addressDetails.area);
    console.log("splitAddress", splitAddress[splitAddress.length - 1]);

    let findTotal = store
      .getState()
      .cart.total.find((i) => i.title === "Total");
    let paymentURLReqData = {
      address: {
        city: addressDetails?.city || "Jeddah",
        street: splitAddress[splitAddress.length - 1] || "Jeddah",
        state: splitAddress[splitAddress.length - 1] || "Jeddah",
      },
      amount: `${findTotal.price}`,
      card_type: cardType,
    };
    console.log("paymentURLReqData", paymentURLReqData);
    paymentByCard(paymentURLReqData)
      .then((response) => {
        // console.log("response", response.data?.data);
        // console.log(
        //   "responsepayment",
        //   config.BASE_URL + "/v1/payment/page/" + response?.data?.data?.id
        // );
        setPaymentUrl(
          config.BASE_URL + "/v1/payment/page/" + response?.data?.data?.id
        );
        // console.log(url, "url is here");
      })
      .catch((error) => {
        console.log("errorrr", error);
      });
  }, []);

  const handleWebViewNavigationStateChange = async (newNavState) => {
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }

    try {
      // console.log("newNavStatenewNavState", newNavState.url);
      const { url } = newNavState;
      // if (!url) return;

      if (url.includes("error")) {
        Navigation.goBack();
        const _url = url.split("error/");
        // const errorData = JSON.parse(atob(_url[1]));
        console.log("_url", _url);
        // console.log("errorData", errorData);
        showToast({
          type: "error",
          text: t("Something went wrong"),
        });
        return;
      }

      if (url.includes("thankyou")) {
        try {
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
                paymentMethod: "credit_card",
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
                  fullAddress:
                    props?.route?.params?.addressDetails?.fullAddress,
                  lat: props?.route?.params?.addressDetails?.lat,
                  lng: props?.route?.params?.addressDetails?.lng,
                  area: props?.route?.params?.addressDetails?.area,
                  city: props?.route?.params?.addressDetails?.city,
                  comment: "",
                },
                paymentAddress: {
                  fullAddress:
                    props?.route?.params?.addressDetails?.fullAddress,
                  lat: props?.route?.params?.addressDetails?.lat,
                  lng: props?.route?.params?.addressDetails?.lng,
                  area: props?.route?.params?.addressDetails?.area,
                  city: props?.route?.params?.addressDetails?.city,
                  comment: "",
                },
              },
            };
          }

          let cartItems = [];
          items.map((item) => {
            // console.log("bulk add item", item);
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

          const { _data } = await addCartBulk(
            customer?.id,
            { items: cartItems },
            codes.accessToken
          );

          const { data } = await checkout(orderObj, codes.accessToken);
          // console.log("data==>", data);
          setOrderLoading(false);
          dispatch(clearCart());
          showToast({
            text: t("Order Placed Successfully"),
            type: "success",
          });

          Navigation.navigate(SCREENS.THANK_YOU, {
            orderId: data?.data?.id || "",
          });
        } catch (error) {
          setOrderLoading(false);
          showToast({
            text: error?.response?.data?.message || error.message,
            type: "error",
          });
        }
        return;
      }
    } catch (error) {
      showToast({
        type: "error",
        text: error.message || t("Something went wrong"),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Payment" backButton />
      <View style={{ flex: 1 }}>
        {url && (
          <WebView
            startInLoadingState={true}
            ref={webview}
            scalesPageToFit={Platform.OS === "ios" ? false : true}
            style={{
              width: metrix.HorizontalSize(820),
              position: "relative",
              // left: -180,
              left: metrix.HorizontalSize(-198),
              right: 0,
              top: 0,
              bottom: 0,
            }}
            // scalesPageToFit={true}
            // onError={(syntheticEvent) => {
            //   const { nativeEvent } = syntheticEvent;
            //   console.log("WebView error: ", nativeEvent.url);
            // }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            source={{
              uri: url,
              headers: {
                Authorization: `Bearer ${
                  store.getState().auth.codes.accessToken
                }`,
              },
            }}
          />
        )}
      </View>
    </View>
  );
}

export default Index;
