import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import {
  Card,
  Header,
  StatusButton,
  Text,
  CustomButton,
  IconButton,
} from "../../components";
import { useDispatch } from "react-redux";
import { _mergeCart } from "../../store/actions";
// import { Rating } from "react-native-ratings";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { IMAGES } from "../../assets/images";
import {
  getOrderDetail,
  getOrderRating,
  cancelOrder,
} from "../../config/api/orders";
import { fetchTotalOrderHistory } from "../../utils/helpers";
import { Modal } from "../../components";
import { reOrder } from "../../config/api/cart";
import {
  REPEAT_ORDER_STATUS_1,
  REPEAT_ORDER_STATUS_2,
  REPEAT_ORDER_STATUS_3,
  REPEAT_ORDER_STATUS_4,
  REPEAT_ORDER_STATUS_5,
  REPEAT_ORDER_STATUS_6,
} from "../../config/constants";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { showToast } from "../../utils";
import navigation from "../../navigation/root";
import { useTranslation } from "react-i18next";
function Index(props) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);
  const [orderDetails, setorderDetails] = useState(null);
  const [orderItems, setorderItems] = useState([]);
  const [totals, setTotals] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [isCLoading, setCLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [activeindex, setActiveIndex] = useState(0);
  const [repeatOrders, setRepeatOrders] = useState([]);
  const [ratingData, setRating] = useState({});
  const dispatch = useDispatch();

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const viewRef = useRef(null);

  useEffect(() => {
    getRefreshData();
  }, []);

  const setRepeatList = (data) => {
    if (data.orderType === "subscription") {
      setRepeatOrders([
        {
          label: "Cancel all repeat orders",
          value: 0,
        },
        {
          label: "Reorder Every Week",
          value: 2,
        },
        {
          label: "Reorder Every Month",
          value: 3,
        },
        {
          label: "Reorder Every 3 month",
          value: 4,
        },
      ]);
    } else {
      setRepeatOrders([
        {
          label: "Cancel all repeat orders",
          value: 0,
        },
        {
          label: "Reorder now",
          value: 1,
        },
        {
          label: "Reorder Every Week",
          value: 2,
        },
        {
          label: "Reorder Every Month",
          value: 3,
        },
        {
          label: "Reorder Every 3 month",
          value: 4,
        },
      ]);
    }
  };

  const getRefreshData = async () => {
    try {
      setisLoading(true);
      const { data } = await getOrderDetail(props.route.params.orderId);
      const { data: ratingData } = await getOrderRating(
        props.route.params.orderId
      );
      if (ratingData.data) {
        const { customerComments, ratingStar } = ratingData.data;
        let data = [];
        for (let i = 0; i < ratingStar; i++) {
          data.push("star");
        }
        setRating({
          customerComments,
          ratingStar: data,
        });
      }
      // console.log("ratingData", data);
      setorderDetails(data.data);
      setRepeatList(data.data);
      setorderItems(data.data.OrderProducts);
      let totalData = fetchTotalOrderHistory(data.data.OrderTotals);
      setTotals(totalData);
      setisLoading(false);
      setCLoading(false);
    } catch (error) {
      setisLoading(false);
      showToast({
        type: "error",
        text: error.message,
      });
      Navigation.goBack();
    }
  };
  const handleTabPress = (value) => {
    setActiveTab(value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getStatusAsString = (value) => {
    switch (value) {
      case 0:
        return REPEAT_ORDER_STATUS_1;
      case 1:
        return REPEAT_ORDER_STATUS_2;
      case 2:
        return REPEAT_ORDER_STATUS_3;
      case 3:
        return REPEAT_ORDER_STATUS_4;
      case 4:
        return REPEAT_ORDER_STATUS_5;
    }
  };

  const reOrderStatus = async () => {
    try {
      let data = {
        orderId: props?.route?.params?.orderId,
        status: getStatusAsString(repeatOrders[activeindex].value),
        index: props?.route?.params?.orderData.index,
      };

      const response = await reOrder(data);

      if (data.status === REPEAT_ORDER_STATUS_2) {
        dispatch(_mergeCart(response?.data?.data));
        Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
      }

      // console.log("datadatadata", response);
    } catch (error) {
      showToast({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleOrderCancel = async () => {
    try {
      setCLoading(true);
      const { data } = await cancelOrder(orderDetails.id, "4");
      setCLoading(false);
      setCancelModal(false);
      if (data?.error) {
        showToast({
          type: "error",
          text: data?.message,
        });
      } else {
        showToast({
          type: "success",
          text: t("Order Cancelled Successfully"),
        });
        navigation.goBack();
      }
      // console.log("data==>", data);
    } catch (error) {
      setCLoading(false);
      showToast({
        type: "error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <Fragment>
      <Header backButton text={`Order # ${props.route?.params?.orderId}`} />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      ) : (
        <Fragment>
          <View
            style={{
              ...styles.container,
              opacity: modalVisible || cancelModal ? 0.5 : 1,
            }}
          >
            <Modal
              viewRef={viewRef}
              modalVisible={cancelModal}
              setModalVisible={setCancelModal}
            >
              <View
                style={{
                  ...styles.modalView,
                  height: metrix.VerticalSize(300),
                }}
              >
                <IconButton
                  buttonStyle={styles.closeIcon}
                  icon={IMAGES.closeIcon}
                  onPress={() => setCancelModal(false)}
                />
                <Text style={styles.modalHeading}>
                  Verify Order Cancellation
                </Text>
                <Text size={19} style={styles.cancelText}>
                  Order # {props?.route?.params?.orderId}
                </Text>
                <Text size={19} style={styles.cancelText}>
                  Total {" " + totals?.["Total"]}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignCenter: "center",
                    justifyContent: "space-around",
                    marginTop: metrix.VerticalSize(25),
                  }}
                >
                  <CustomButton
                    textStyle={{ color: Colors.primary }}
                    variant="outlined"
                    onPress={() => setCancelModal(false)}
                    style={styles.modalBtn}
                  >
                    No
                  </CustomButton>
                  <CustomButton
                    isLoading={isCLoading}
                    onPress={handleOrderCancel}
                    style={styles.modalBtn}
                  >
                    Yes
                  </CustomButton>
                </View>
              </View>
            </Modal>
            <Modal
              viewRef={viewRef}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            >
              <View style={styles.modalView}>
                <IconButton
                  buttonStyle={styles.closeIcon}
                  icon={IMAGES.closeIcon}
                  onPress={closeModal}
                />
                <Text style={styles.modalHeading}>Repeat Order</Text>
                {repeatOrders.map((item, index) => (
                  <View key={index.toString()} style={styles.rowContainer}>
                    <TouchableOpacity
                      {...touchableProps}
                      style={styles.circle}
                      onPress={() => setActiveIndex(index)}
                    >
                      {activeindex === index && (
                        <View style={styles.innerCircle}></View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.paymentText}>{item?.label}</Text>
                  </View>
                ))}
                <CustomButton
                  onPress={() => reOrderStatus()}
                  style={styles.modalBtn}
                >
                  Submit
                </CustomButton>
              </View>
            </Modal>
            <View style={styles.textRow}>
              <Text style={styles.orderNoText}>Items</Text>
              {orderDetails?.OrderStatus && (
                <StatusButton type={orderDetails?.OrderStatus?.name} />
              )}
            </View>
            <View style={{ height: metrix.VerticalSize(400) }}>
              <FlatList
                data={orderItems}
                numColumns={1}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Card item={item} order orderDetails />
                )}
              />
            </View>

            <View style={styles.orderCard}>
              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Sub Total</Text>
                <Text style={{ ...styles.dateText, fontWeight: "bold" }}>
                  {totals?.["Sub Total"] || ""}
                </Text>
              </View>
              {totals?.Discount !== "SR 0.00" && (
                <View style={styles.detailsBox}>
                  <Text style={styles.dateText}>Discount</Text>
                  <Text style={{ ...styles.dateText, fontWeight: "bold" }}>
                    {totals?.Discount || ""}
                  </Text>
                </View>
              )}

              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>VAT</Text>
                <Text style={{ ...styles.dateText, fontWeight: "bold" }}>
                  {totals?.Vat || ""}
                </Text>
              </View>
              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Standard Shipping </Text>
                <Text style={{ ...styles.dateText, fontWeight: "bold" }}>
                  {totals?.Shipping || ""}
                </Text>
              </View>
            </View>
            <View style={styles.ratingRow}>
              <View
                style={{ ...styles.ratingBox, justifyContent: "flex-start" }}
              >
                {ratingData.ratingStar && (
                  <Fragment>
                    <Text style={styles.grandTotal}>Order Rating </Text>
                    {ratingData.ratingStar.map((item, i) => (
                      <Image
                        key={i.toString()}
                        source={IMAGES.star}
                        style={styles.star}
                        resizeMode="contain"
                      />
                    ))}
                    {/* <Rating
                      isDisabled={true}
                      style={styles.rating}
                      ratingColor={Colors.primary}
                      type="star"
                      ratingCount={ratingData.ratingStar}
                      imageSize={metrix.VerticalSize(20)}
                    /> */}
                  </Fragment>
                )}
              </View>
              <View style={styles.ratingBox}>
                <Text style={styles.grandTotal}>Total </Text>
                <Text
                  style={{
                    ...styles.grandTotal,
                    color: Colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  {totals?.Total}
                </Text>
              </View>
            </View>
            {ratingData.customerComments && (
              <View style={styles.commentRow}>
                <Text style={styles.commentText}>Comments : </Text>
                <Text style={styles.commentText}>
                  {ratingData?.customerComments}
                </Text>
              </View>
            )}
            <View style={styles.btnRow}>
              <CustomButton onPress={() => setModalVisible(true)} type="large">
                Repeat Order
              </CustomButton>
              {orderDetails?.OrderStatusId !== 4 && (
                <CustomButton
                  type="large"
                  textStyle={{ color: Colors.primary }}
                  variant="outlined"
                  onPress={() => {
                    console.log(
                      "orderDetails?.OrderStatusId",
                      orderDetails?.OrderStatusId
                    );
                    navigation.navigate(SCREENS.ORDER_STATUS, {
                      orderId: props.route?.params?.orderId,
                      OrderStatusId: orderDetails?.OrderStatusId,
                      ratingData: ratingData,
                    });
                  }}
                >
                  Order Status
                </CustomButton>
              )}
            </View>
            {orderDetails?.OrderStatusId === 1 && (
              <CustomButton
                style={styles.bottomBtn}
                onPress={() => setCancelModal(true)}
                type="large"
              >
                Cancel Order
              </CustomButton>
            )}
          </View>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Index;
