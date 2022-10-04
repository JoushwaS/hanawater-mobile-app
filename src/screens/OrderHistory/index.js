import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Image,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import {
  Header,
  StatusButton,
  IconButton,
  CustomButton,
} from "../../components";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { IMAGES } from "../../assets/images";
import { ICONS } from "../../assets/icons";
import { getOrders } from "../../config/api/orders";
import { useDispatch, useSelector } from "react-redux";
import {
  CURRENCY_PREFIX,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_NEW,
  ORDER_STATUS_ONROUTE,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_RESCHEDULE,
} from "../../config/constants";
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
import { dateFormat } from "../../utils/helpers";
import { _mergeCart } from "../../store/actions";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

function Index(props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [activeOrder, setActiveOrder] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [orderactiveIndex, setorderActiveIndex] = useState(-1);

  const [currentOrders, setCurrentOrders] = useState([]);
  const [historyOrders, sethistoryOrders] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeindex, setActiveIndex] = useState(0);
  const [activeOrderName, setactiveOrderName] = useState("");

  const [order, setorder] = useState();
  const [repeatOrders, setRepeatOrders] = useState([]);
  const viewRef = useRef(null);

  useEffect(() => {
    if (activeOrder?.orderType === "subscription") {
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
  }, [activeOrder]);

  const dispatch = useDispatch();

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };
  const { customer, codes } = useSelector((state) => state.auth);

  useFocusEffect(
    useCallback(() => {
      setrefreshing(true);
      getRefreshData();
    }, [])
  );

  const getRefreshData = async () => {
    const { data } = await getOrders(customer.id);
    // console.log("dataaaa orderss", data.data[0]);
    let pending = data.data.filter(
      (order) =>
        order.OrderStatusId == 1 ||
        order.OrderStatusId == 2 ||
        order.OrderStatusId == 3 ||
        order.OrderStatusId == 6 ||
        order.OrderStatusId == 7
    );
    let history = data.data.filter(
      (order) => order.OrderStatusId == 4 || order.OrderStatusId == 5
    );

    setCurrentOrders(pending);
    sethistoryOrders(history);
    setrefreshing(false);
  };
  const onPressDetail = (index) => {
    if (index === activeOrder) setActiveOrder({});
    else setActiveOrder(index);
  };

  const openmodal = (item) => {
    setorder(item);
    setModalVisible(true);
  };

  const handleTabPress = (value) => {
    setActiveTab(value);
    setActiveOrder(null);
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
  const handleCardPress = (order, orderId) => {
    setactiveOrderName("Details");
    setActiveOrder(null);
    setorderActiveIndex(orderId);
    Navigation.navigate(SCREENS.ORDER_DETAILS, {
      orderData: order,
      orderId: orderId,
    });
  };
  const reOrderStatus = async () => {
    try {
      setLoading(true);
      // console.log("order", order);

      let data = {
        orderId: order?.id,
        status: getStatusAsString(repeatOrders[activeindex].value),
        index: order?.index,
      };

      const response = await reOrder(data);
      // console.log("response data", response, data);
      setLoading(false);
      setModalVisible(false);
      if (data.status === REPEAT_ORDER_STATUS_1) {
        showToast({
          type: "success",
          text: `Order no ${order.id} is cancelled`,
        });
        return;
      }
      if (data.status === REPEAT_ORDER_STATUS_2) {
        dispatch(_mergeCart(response?.data?.data));
        Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
        return;
      }
      showToast({
        type: "success",
        text: `Order no ${order.id} is reordered`,
      });
      // console.log("datadatadata", response);
    } catch (error) {
      setLoading(false);
      showToast({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };
  const handleOrderStatus = (item) => {
    setactiveOrderName("Order Status");
    setorderActiveIndex(item.id);
    setActiveOrder(null);
    // console.log("itemid", item);
    Navigation.navigate(SCREENS.ORDER_STATUS, {
      orderId: item.id,
      OrderStatusId: item?.OrderStatusId,
    });
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={{ ...styles.container, opacity: modalVisible ? 0.5 : 1 }}>
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
            isLoading={isLoading}
            onPress={() => reOrderStatus()}
            style={styles.modalBtn}
          >
            Submit
          </CustomButton>
        </View>
      </Modal>
      <Header backButton text={t("orders")} />
      <View style={styles.tabView}>
        <TouchableOpacity
          style={[
            styles.tab1,
            activeTab === 0 ? { backgroundColor: Colors.primary } : {},
          ]}
          onPress={() => handleTabPress(0)}
          {...touchableProps}
        >
          <Text
            style={[styles.tabText, activeTab === 0 ? styles.tabActive : {}]}
          >
            {t("current")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab2,
            activeTab === 1 ? { backgroundColor: Colors.primary } : {},
          ]}
          onPress={() => handleTabPress(1)}
          {...touchableProps}
        >
          <Text
            style={[styles.tabText, activeTab === 1 ? styles.tabActive : {}]}
          >
            {t("history")}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === 0 ? currentOrders : historyOrders}
        numColumns={1}
        contentContainerStyle={styles.listView}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getRefreshData()}
          />
        }
        ListEmptyComponent={() => (
          <Text style={{ ...styles.dateText, textAlign: "center" }}>
            No orders found !
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPressDetail}
            style={styles.orderCard}
          >
            <View style={styles.textRow}>
              <Text style={styles.orderNoText}>Order No. {item.id}</Text>
              <View style={styles.cardRow}>
                <StatusButton type={item.status} />
                <TouchableOpacity
                  onPress={() => onPressDetail(index)}
                  style={{
                    marginLeft: metrix.HorizontalSize(10),
                  }}
                  hitSlop={{
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  }}
                  {...touchableProps}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.icon}
                    source={ICONS.detailsIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {item.repeat ? (
              <Text style={styles.repeatText}>Repeat for every week</Text>
            ) : null}
            {activeOrder === index && (
              <View style={styles.optionsBox}>
                <TouchableOpacity
                  {...touchableProps}
                  style={{
                    backgroundColor:
                      orderactiveIndex === item?.id &&
                      activeOrderName === "Repeat Order"
                        ? Colors.primary
                        : "transparent",
                  }}
                  onPress={() => {
                    setActiveOrder(item);
                    setactiveOrderName("Repeat Order");
                    setorderActiveIndex(item?.id);
                    // setorderActiveIndex(-1);
                    openmodal(item);
                  }}
                >
                  <Text
                    style={[
                      styles.boxText,
                      {
                        color:
                          orderactiveIndex === item?.id &&
                          activeOrderName === "Repeat Order"
                            ? Colors.White
                            : Colors.primary,
                      },
                    ]}
                  >
                    Repeat Order
                  </Text>
                </TouchableOpacity>
                {activeTab == 0 && (
                  <TouchableOpacity
                    onPress={() => handleOrderStatus(item)}
                    style={{
                      backgroundColor:
                        orderactiveIndex === item?.id &&
                        activeOrderName === "Order Status"
                          ? Colors.primary
                          : "transparent",
                    }}
                    {...touchableProps}
                  >
                    <Text
                      style={[
                        styles.boxText,
                        {
                          color:
                            orderactiveIndex === item?.id &&
                            activeOrderName === "Order Status"
                              ? Colors.White
                              : Colors.primary,
                        },
                      ]}
                    >
                      Order Status
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      orderactiveIndex === item?.id &&
                      activeOrderName === "Details"
                        ? Colors.primary
                        : "transparent",
                  }}
                  onPress={() => handleCardPress(item, item.id)}
                  {...touchableProps}
                >
                  <Text
                    style={[
                      styles.boxText,
                      {
                        color:
                          orderactiveIndex === item?.id &&
                          activeOrderName === "Details"
                            ? Colors.White
                            : Colors.primary,
                      },
                    ]}
                  >
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.dateText}>
              {dateFormat(item.deliveryDate.split("-").join("/"))}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.dateText}>Total</Text>
              <Text style={styles.dateText}>
                {CURRENCY_PREFIX} {item.total ? item.total.value : 0}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.dateText}>Payment Method</Text>
              <Text style={styles.dateText}>{item.paymentMethod}</Text>
            </View>
            <View style={{ marginTop: metrix.VerticalSize(20) }}>
              <ScrollView horizontal>
                {item.products.map((product, index) => {
                  let productImage = IMAGES.download_placeholder;
                  if (product.imagePath) {
                    productImage = { uri: product.imagePath };
                  }

                  return (
                    //Solve
                    <Image
                      key={index.toString()}
                      resizeMode="contain"
                      style={styles.cardImg}
                      source={productImage}
                    />
                  );
                })}
              </ScrollView>
            </View>
            {/* <View style={styles.imageRow}>
              {[1, 2, 3].map((item, i) => (
                <Image
                  key={i.toString()}
                  resizeMode="contain"
                  style={styles.cardImg}
                  source={IMAGES.bag1}
                />
              ))}
            </View> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Index;
