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
import base64 from "react-native-base64";
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

  let paymentResult = null;
  

  
  const handleWebViewNavigationStateChange =  (newNavState) => {
    console.log("Function call - handleWebViewNavigationStateChange()");
    // newNavState : {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    

    console.log("Final payment status URL", url);   

    if(paymentResult){
      return;
    }

    if (url.includes("error")) {
      let delimeter = "/error/"
      paymentResult = transformPaymentResultFromURL(delimeter,url);
      showToast({type: "error",text: paymentResult.statusCode +" | "+t(paymentResult.description)});
    }

    if (url.includes("thankyou")) {
      let delimeter = "/thankyou/"
      paymentResult = transformPaymentResultFromURL(delimeter,url); 
      //decode the response
      showToast({type: "success",text: t("Payment successfull")});
    }

    if(paymentResult){
      props.route.params.callback(paymentResult)
      Navigation.goBack();
    }

  
  };

  const transformPaymentResultFromURL = (delimeter,url) =>{
    const temp_arr = url.split(delimeter);
    console.log("temp_arr",temp_arr);
    const str_response = base64.decode(temp_arr[1]);
    const response = JSON.parse(str_response);

    const statusCode = response.data.hyperpayResult.result.code;
    const trackId = response.data.hyperpayResult.ndc;  
    const description = response.data.hyperpayResult.result.description;

    return { statusCode, trackId, description}
  }

  return (
    <View style={styles.container}>
      <Header text="Payment" backButton />
      <View style={{ flex: 1 }}>
       
        {url && !paymentResult && (
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
