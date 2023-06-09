import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { Text, IconButton, CustomButton } from "../../components";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import { SCREENS } from "../../config/constants/screens";
import { Modal } from "../../components";
import { IMAGES } from "../../assets/images";
// import { ICONS} from "../../assets/icons";
// import { BlurView, VibrancyView } from "@react-native-community/blur";
import { getItems } from "../../utils/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICONS } from "../../assets/icons";
import { store } from "../../store";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

function Index({
  isLoading = false,
  getRefreshData = () => {},
  refreshing,
  totalData = {
    totals: [],
    freeDelivery: {},
  },
  orderLoading = false,
  couponCode,
  setCouponCode = () => {},
  handleApplyCoupon = () => {},
  handlePlaceOrder = () => {},
  modalVisible = false,
  setModalVisible = () => {},
  addressList,
  setCardType = () => {},
  couponValid,
  setCouponValid = () => {},
  paymentTypes,
  cardType,
  cardModal = false,
  setCardModal = () => {},
}) {
  // const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (addressList.length > 0) {
      setAddress(0);
      setaddressDetails(addressList[0]);
    }
  }, [addressList, couponValid]);

  const [activeindex, setActiveIndex] = useState(3);
  const [addressDetails, setaddressDetails] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [paymentMethodList, setpaymentMethodList] = useState([]);
  const viewRef = useRef(null);

  const touchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };
  /* let paymentMethods = [
    {
      name: "Visa",
      type: "visa",
      id: 0,
      icon: ICONS.visaIcon,
    },
    {
      name: "MasterCard",
      type: "master",
      id: 1,
      icon: ICONS.mastarcardIcon,
    },
    {
      name: "mada",
      type: "mada",
      id: 2,
      icon: ICONS.madaIcon,
    },
    {
      name: "applepay",
      type: "applepay",
      id: 3,
      icon: ICONS.applePayIcon,
    },
  ]; */

  let paymentMethods = paymentTypes.map((pt) => {
    const { name, status, type, id } = pt;
    console.log("payment Types here>>", paymentTypes);
    let icon;
    switch (type) {
      case "visa":
        icon = ICONS.visaIcon;
        break;
      case "master":
        icon = ICONS.mastarcardIcon;
        break;
      case "mada":
        icon = ICONS.madaIcon;
        break;
      case "applepay":
        icon = ICONS.applePayIcon;
        break;
      default:
        icon = null;
    }

    if (status != "active") {
      return;
    }

    // Exclude apple pay if Platform.OS is android
    // if (Platform.OS === "android" && type == "applepay") {
    //   return;
    // }

    return { id, name, type, icon };
  });

  const [addressIndex, setAddress] = useState(0);

  const closeModal = () => {
    setModalVisible(false);
    setCouponCode("");
  };

  const selectAddress = (item, index) => {
    setAddress(index);
    setaddressDetails(item);
  };

  const renderAddress = (item, index) => {
    let ind = store.getState().cart.items.findIndex((val) => {
      return val?.showMosque;
    });
    if (ind > -1) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    console.log("Platform.OS>>", Platform.OS);
    // if (Platform.OS != "ios") {
    //   paymentMethods = paymentMethods.filter((a) => {
    //     if (a.name != "applepay") {
    //       return a;
    //     }
    //   });

    //   console.log("filter payment methods>>", paymentMethods);
    // } else {
    //   console.log("paymentMethods>>>>>>", paymentMethods);
    // }
  }, [Platform.OS]);

  return (
    <View
      style={{
        ...styles.container,
        // backgroundColor: modalVisible ? "#1E1E1E" : Colors.White,
        backgroundColor: Colors.White,
        opacity: modalVisible ? 0.3 : 1,
      }}
    >
      {/* <Modal
        viewRef={viewRef}
        setModalVisible={setCardModal}
        modalVisible={cardModal}
      >
        <View style={styles.modalView}>
          <Text style={{ ...styles.modalHeading }}>
            Please select card type
          </Text>
          <IconButton
            buttonStyle={styles.closeIcon}
            icon={IMAGES.closeIcon}
            onPress={() => setCardModal(false)}
          />
          {cardTypes.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              activeOpacity={0.5}
              style={styles.rowContainer}
              onPress={() => {
                setCardType(item);
                setTimeout(() => {
                  setCardModal(false);
                }, 500);
              }}
            >
              <View style={styles.circle}>
                {cardType === item && <View style={styles.innerCircle}></View>}
              </View>
              <Text style={styles.paymentText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal> */}
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
          <Text style={styles.modalHeading}>
            Enter coupon code sent to your cell phone/email...
          </Text>
          <TextInput
            style={styles.textInput}
            value={couponCode}
            onChangeText={(text) => setCouponCode(text)}
            maxLength={12}
            autoFocus
          ></TextInput>
          <CustomButton onPress={handleApplyCoupon} style={styles.modalBtn}>
            Ok
          </CustomButton>
        </View>
      </Modal>
      <View style={styles.ContainerPadding}>
        {renderAddress() && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.headingText}>{t("addresses")}</Text>
            <TouchableOpacity
              onPress={() => Navigation.navigate(SCREENS.MAP_ADDRESS)}
            >
              <Image source={ICONS.plus} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        )}

        {addressList.length == 0 && !isLoading ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.locationtextStyle}>No address found</Text>
            <TouchableOpacity
              onPress={() => Navigation.navigate(SCREENS.MAP_ADDRESS)}
            >
              <Image source={ICONS.plus} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <Fragment>
            {renderAddress() && (
              <ScrollView
                style={{
                  height:
                    addressList.length > 3 ? metrix.VerticalSize(220) : "auto",
                }}
              >
                {addressList.map((item, index) => (
                  <View key={index.toString()} style={styles.addressRow}>
                    <TouchableOpacity
                      {...touchableProps}
                      style={styles.circle}
                      onPress={() => selectAddress(item, index)}
                    >
                      {addressIndex == index && (
                        <View style={styles.innerCircle}></View>
                      )}
                    </TouchableOpacity>
                    <View style={styles.shippingBox}>
                      <Text style={styles.locationtextStyle}>
                        {item?.fullAddress}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </Fragment>
        )}
        <View>
          <Text style={styles.headingText}>{t("payment_mode")}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {paymentMethods.map((item, index) => (
              <View key={index.toString()} style={styles.rowContainer}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    setActiveIndex(index);
                  }}
                >
                  {activeindex === index && (
                    <View style={styles.innerCircle}></View>
                  )}
                </TouchableOpacity>

                {item.icon && (
                  <IconButton
                    paymentIcon={true}
                    buttonStyle={styles.paymentIcon}
                    icon={item.icon}
                    iconStyle={{ fontSize: "5rem !important" }}
                    onPress={() => {
                      setActiveIndex(index);
                      setCardType(item.type);
                    }}
                  />
                )}

                {!item.icon && (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveIndex(index);
                      setCardType(item.type);
                    }}
                  >
                    <Text style={styles.paymentText}>Cash</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          <View style={styles.totalBox}>
            {isLoading ? (
              <ActivityIndicator color={Colors.primary}></ActivityIndicator>
            ) : (
              <>
                <View style={styles.totalTextRow}>
                  <View>
                    <Text style={styles.totalText}>
                      {totalData?.totals[0]?.title || ""}
                    </Text>
                    <Text style={styles.totalText}>{"VAT"}</Text>
                    <Text style={styles.totalText}>
                      {totalData?.totals[2]?.title || ""}
                    </Text>
                    <Text style={styles.totalText}>
                      {totalData?.totals[3]?.title || ""}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.totalTextVal}>
                      {totalData?.totals[0]?.format || ""}
                    </Text>
                    <Text style={styles.totalTextVal}>
                      {totalData?.totals[1]?.format || ""}
                    </Text>
                    <Text style={styles.totalTextVal}>
                      {totalData?.totals[2]?.format || ""}
                    </Text>
                    <Text style={styles.totalTextVal}>
                      {totalData?.totals[3]?.format || ""}
                    </Text>
                  </View>
                </View>
                {totalData?.freeDelivery?.isFree ? (
                  <Text
                    style={{
                      ...styles.freeText,
                      marginHorizontal: metrix.HorizontalSize(20),
                      marginBottom: metrix.HorizontalSize(5),
                    }}
                  >
                    Your delivery is free
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => Navigation.navigate(SCREENS.HOME_SCREEN)}
                    {...touchableProps}
                  >
                    <Text style={styles.freeText}>
                      Want free delivery? Add SR{" "}
                      {totalData?.freeDelivery?.remainingAmount || ""} more
                    </Text>
                  </TouchableOpacity>
                )}
                {couponValid ? (
                  <View style={styles.couponBox}>
                    <Text style={styles.couponText}>
                      Coupon Applied - {couponCode}
                    </Text>
                    <TouchableOpacity
                      {...touchableProps}
                      onPress={() => {
                        setCouponCode("");
                        setCouponValid(false);
                        getRefreshData();
                      }}
                    >
                      <Image
                        source={IMAGES.closeIcon}
                        style={styles.removeCoupon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <CustomButton
                    style={{
                      marginHorizontal: metrix.HorizontalSize(15),
                      marginVertical: metrix.VerticalSize(10),
                    }}
                    onPress={() => setModalVisible(true)}
                    type="large"
                  >
                    {t("apply_coupon")}
                  </CustomButton>
                )}
              </>
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.grandTotalText}> Total </Text>
            <Text style={styles.grandTotal}>
              {totalData?.totals[4]?.format || ""}
            </Text>
          </View>
          <CustomButton
            disabled={isSubmitting}
            onPress={() => {
              console.log("activeindex", activeindex);
              if (activeindex >= 0) {
                setisSubmitting(true);
                handlePlaceOrder(addressDetails, activeindex);
              } else {
                showToast({
                  text: t("Please Select a Payment Method"),
                  type: "error",
                });
              }
            }}
            style={styles.buttonStyle}
            variant="filled"
            type="large"
            isLoading={orderLoading}
          >
            {t("place_order")}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

export default Index;
