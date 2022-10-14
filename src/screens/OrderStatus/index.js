import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./style";
import { CustomButton, Header, Text, Circle } from "../../components";
import { IMAGES } from "../../assets/images";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { Colors, Fonts } from "../../config/theme";
import { useTranslation } from "react-i18next";
import StepIndicator from "react-native-step-indicator";
import { showToast } from "../../utils";
import {
  ORDER_STATUS_NEW,
  ORDER_STATUS_ONROUTE,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_PROGRESS,
} from "../../config/constants";
import metrix from "../../config/metrix";
import { getOrderDetail } from "../../config/api/orders";

function Index(props) {
  const { t } = useTranslation();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [orderStatusId, setOrderStatusId] = useState("");

  const getRefreshData = async () => {
    try {
      const { data } = await getOrderDetail(props.route.params.orderId);
      setOrderStatusId(data.data.OrderStatusId);
      // console.log(orderStatusId, "statusid");
      // console.log(data.data.OrderStatusId, "hi");
      if (data.data.OrderStatusId == "1") {
        // console.log("inside", data.data.OrderStatusId);
        setCurrentPosition(0);
      }
      if (data.data.OrderStatusId == "2") {
        // console.log("inside", data.data.OrderStatusId);
        setCurrentPosition(2);
      }
      if (data.data.OrderStatusId == "5" || data.data.OrderStatusId == "6") {
        // console.log("inside", data.data.OrderStatusId);

        setCurrentPosition(3);
      }
      if (data.data.OrderStatusId == "7") {
        // console.log("inside", data.data.OrderStatusId);

        setCurrentPosition(1);
      }
    } catch (error) {
      showToast({
        type: "error",
        text: error.message,
      });
    }
  };
  var count = 0;
  var x = setInterval(() => {
    getRefreshData();
    if (count >= 6) clearInterval(x);
    count++;
  }, 5000);

  useEffect(() => {
    getRefreshData();
  }, []);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: Colors.White,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: Colors.primary,
    stepStrokeUnFinishedColor: Colors.dullgrey,
    separatorFinishedColor: Colors.CouponView,
    separatorUnFinishedColor: Colors.dullgrey,
    stepIndicatorFinishedColor: Colors.primary,
    stepIndicatorUnFinishedColor: Colors.dullgrey,
    stepIndicatorCurrentColor: Colors.primary,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: Colors.primary,
    stepIndicatorLabelFinishedColor: Colors.primary,
    stepIndicatorLabelUnFinishedColor: Colors.dullgrey,
    labelColor: "#999999",
    labelSize: metrix.CustomFontSize(16 + 2),
    labelFontFamily: Fonts.IR,
    currentStepLabelColor: Colors.primary,
  };

  const orderStatus = [
    "Submitted",
    "Accepted",
    "In Progress",
    orderStatusId == "6" ? "On Hold" : "Delivered",
  ];

  return (
    <View style={styles.container}>
      <Header backButton text="" orderstatus />
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={IMAGES.orderStatus1}
      ></Image>
      <Text style={styles.heading}>{t("order_status")}</Text>

      <StepIndicator
        customStyles={customStyles}
        stepCount={4}
        currentPosition={currentPosition}
        labels={orderStatus}
      />
      <Image
        resizeMode={"contain"}
        style={styles.clockImage}
        source={IMAGES.clock}
      ></Image>
      {/* <Text style={styles.subHeading}>{t("Remaining 60 mins")}</Text> */}
      {!props.route?.params?.ratingData?.ratingStar && (
        <CustomButton
          style={styles.button}
          type="large"
          onPress={() =>
            Navigation.navigate(SCREENS.RATE_US, {
              orderId: props?.route?.params?.orderId,
            })
          }
          variant="filled"
        >
          {t("Rate This Order")}
        </CustomButton>
      )}
    </View>
  );
}

export default Index;
