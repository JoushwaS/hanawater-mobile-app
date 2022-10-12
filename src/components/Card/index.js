import React, { Fragment, useState, useRef } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
} from "react-native";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { Button, CustomButton } from "..";
import { Modal } from "../../components";
import { IconButton, Text, Quantity } from "../index";
import metrix from "../../config/metrix";
import { styles } from "./styles";
import { store } from "../../store";
import { addToCart, clearCart } from "../../store/actions";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
// import sa from "../../../sa.json";
export default function Card({
  item = {
    name: "",
    price: "",
    badgeText: "",
    image: "",
    detail: "",
    subcription: null,
  },
  mosqueDetails,
  activeTab,
  subItems,
  isFavourite = false,
  isCart = false,
  _mosque,
  order,
  showMosque,
  orderDetails,
}) {
  const { t, i18n } = useTranslation();

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModal2, setWarningModal2] = useState(false);
  const [warningModal3, setWarningModal3] = useState(false);

  const dispatch = useDispatch();
  const [activeFontIndex, setActiveFont] = useState(0);
  const viewRef = useRef(null);
  const [subscriptionModal, setSubscriptionModal] = useState(false);

  const { promotions, common, products, mosque, subscriptions, cart } =
    useSelector((state) => state);

  const renderPrice = (item) => {
    // console.log("itemmm cartt=>>");
    if (
      isCart ||
      item?.showMosque ||
      item.showItem ||
      order ||
      activeTab == 1 ||
      showMosque
    ) {
      return (
        <View>
          <Text
            style={[
              styles.cardPriceText,
              {
                textDecorationLine:
                  item?.salePrice && item?.salePrice !== "0.00"
                    ? "line-through"
                    : !item?.salePrice
                    ? "none"
                    : "none",
              },
            ]}
          >
            SR {item?.price} <Text style={styles.iVat}>{t("iVAT")}</Text>
          </Text>
          {/* {item?.salePrice && item?.salePrice !== "0.00" && (
            <Text style={[styles.cardPriceText]}>SR {item?.salePrice}</Text>
          )} */}
        </View>
      );
    } else {
      let price = item?.salePrice !== "0.00" ? item?.salePrice : item?.price;
      let total = subscriptions[activeFontIndex]?.noOfMonths * price * 4;
      return (
        <View style={{}}>
          {/* <Text style={styles.cardPriceText}>SR {item?.price}</Text> //change here */}
          <Text style={styles.cardPriceText}>
            SR {total} <Text style={styles.iVat}>{t("iVAT")}</Text>
          </Text>
        </View>
      );
    }
  };

  const isAlreadyInCart = () => {
    let indsubscription = store
      .getState()
      .cart.items.findIndex((val) => val?.id === item?.id);
    if (indsubscription !== -1) return true;
    else return false;
  };

  const showSubscribe = (item) => {
    // if (activeTab == 1 || isCart == false) {
    // console.log("itemitem", item);
    let indsubscription = store.getState().cart.items.findIndex((val) => {
      return val?.subscription;
    });
    if (activeTab == 1) {
      return (
        <Quantity
          setWarningModal2={setWarningModal2}
          setWarningModal3={setWarningModal3}
          isCart={isCart}
          item={item}
          showItem={true}
        />
      );
    } else if (showMosque) {
      return (
        <Quantity
          isCart={isCart}
          item={item}
          showMosque={true}
          mosque={mosqueDetails}
          setWarningModal2={setWarningModal2}
        />
      );
    } else if (activeTab == 2) {
      //listing btn
      return (
        <Button
          buttonStyle={styles.buttonStyle}
          variant="outlined"
          onPress={() => {
            if (cart.items.length > 0 && !cart.items[0].subscription)
              setWarningModal(true);
            // return;
            dispatch(
              addToCart({
                ...item,
                quantity: 1,
                subscription: {
                  id: subscriptions[activeFontIndex]?.id.toString(),
                  name:
                    subscriptions[activeFontIndex]?.noOfMonths.toString() +
                    "Month",
                },
              })
            );
            showToast({
              type: isAlreadyInCart() ? "success" : "error",
              text: `Subscription Item ${
                isAlreadyInCart() ? "Added to" : "Removed from"
              } Cart`,
            });
          }}
        >
          {t("Subscribe")}
        </Button>
      );
    } else if (indsubscription > -1 && isCart) {
      //Cart page btn
      return (
        <Button
          buttonStyle={styles.buttonStyle}
          variant="filled"
          onPress={() => {
            dispatch(
              addToCart({
                ...item,
                quantity: 1,
                subscription: {
                  id: subscriptions[activeFontIndex]?.id.toString(),
                  name:
                    subscriptions[activeFontIndex]?.noOfMonths.toString() +
                    "Month",
                },
              })
            );
          }}
        >
          {t("Unsubscribe")}
        </Button>
      );
    }
    // else if (indsubscription > -1) {
    //   return (
    //     <Button
    //       buttonStyle={styles.buttonStyle}
    //       variant="filled"
    //       onPress={() => {
    //         dispatch(
    //           addToCart({
    //             ...item,
    //             quantity: 1,
    //             subscription: {
    //               id: item?.subscription?.id,
    //               name: item?.subscription?.name,
    //             },
    //           })
    //         );
    //         showToast({
    //           type: "success",
    //           text: "Subscription Added to Cart",
    //         });
    //       }}
    //     >
    //       Subscribe
    //     </Button>
    //   );
    // }
    else if (isCart == true) {
      return <Quantity isCart={isCart} item={item} />;
    }
    if (cart.length === 0) {
      return <Quantity isCart={isCart} item={item} />;
    } else {
      return null;
    }
    // } else {
    // return (
    //   <Button buttonStyle={styles.buttonStyle} variant="filled">
    //     Subscribe
    //   </Button>
    // );
    // }
  };

  const removeFromCart = () => {
    dispatch(
      addToCart({
        ...item,
        quantity: 0,
      })
    );
  };

  const renderName = (item) => {
    if (item.name) return item.name;
    else {
      const lang = I18nManager.languages === "en" ? "0" : "1";
      console.log("lang", common.lang);
      const name = item?.languages[lang]["ProductLanguage.name"];
      return name;
    }
  };

  const renderDescription = (item) => {
    const lang = common?.lang === "en" ? "0" : "1";
    const description = item?.languages[lang]["ProductLanguage.description"];
    return description;
  };

  return (
    <Fragment>
      <Modal
        viewRef={viewRef}
        // setModalVisible={setModalOpen}
        modalVisible={warningModal3}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            You have items selected for mosque in your cart, Adding Product will
            remove previous items
          </Text>
          <CustomButton
            onPress={() => {
              setWarningModal3(false);
              dispatch(clearCart());
            }}
          >
            Ok
          </CustomButton>
        </View>
      </Modal>

      <Modal
        viewRef={viewRef}
        // setModalVisible={setModalOpen}
        modalVisible={warningModal2}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            You have Subscription Items in your cart, Adding Product will remove
            previous items
          </Text>
          <CustomButton onPress={() => setWarningModal2(false)}>
            Ok
          </CustomButton>
        </View>
      </Modal>
      <Modal
        viewRef={viewRef}
        // setModalVisible={setModalOpen}
        modalVisible={warningModal}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            You have Products in your cart, Adding subscription will remove
            previous items
          </Text>
          <CustomButton onPress={() => setWarningModal(false)}>Ok</CustomButton>
        </View>
      </Modal>

      <Modal
        viewRef={viewRef}
        setModalVisible={setModalOpen}
        modalVisible={isModalOpen}
      >
        <View style={styles.imageModalView}>
          <IconButton
            buttonStyle={styles.closeIcon}
            icon={IMAGES.closeIcon}
            onPress={() => setModalOpen(false)}
          />
          <Image
            resizeMode="contain"
            style={{
              height: metrix.VerticalSize(200),
              width: metrix.VerticalSize(200),
              alignSelf: "center",
              marginTop: metrix.VerticalSize(15),
            }}
            source={{ uri: item?.imagePath }}
          />
        </View>
      </Modal>
      <Modal
        viewRef={viewRef}
        setModalVisible={setSubscriptionModal}
        modalVisible={subscriptionModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Select Subscription Month</Text>
          <IconButton
            buttonStyle={styles.closeIcon}
            icon={IMAGES.closeIcon}
            onPress={() => setSubscriptionModal(false)}
          />
          {subscriptions.length > 0 &&
            subscriptions.map((item, i) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setActiveFont(i);
                  setSubscriptionModal(false);
                }}
                key={i.toString()}
              >
                <Text style={styles.monthText}>
                  {item?.SubscriptionOptionLanguages[0]?.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </Modal>
      <ImageBackground
        source={IMAGES.cardBg}
        resizeMode="contain"
        style={styles.card}
      >
        {isCart && (
          <TouchableOpacity
            {...touchableProps}
            onPress={removeFromCart}
            style={styles.clearIcon}
          >
            <Image
              style={{
                width: metrix.HorizontalSize(25),
                height: metrix.VerticalSize(25),
                tintColor: "white",
              }}
              resizeMode="contain"
              source={IMAGES.closeIcon}
            ></Image>
          </TouchableOpacity>
        )}

        <View
          style={{
            width: metrix.HorizontalSize(240),
            height: metrix.VerticalSize(150),
          }}
        >
          <View
            style={{ ...styles.cardRow, marginTop: metrix.VerticalSize(10) }}
          ></View>
          <View
            style={{
              ...styles.cardRow,
              paddingTop: metrix.VerticalSize(isCart ? 15 : 0),
            }}
          >
            <Text style={styles.cardHeading}>{renderName(item)}</Text>
            <Text
              style={{
                marginLeft: metrix.HorizontalSize(8),
                marginRight: metrix.HorizontalSize(-8),
              }}
            >
              {activeTab === 2 ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: metrix.CustomFontSize(13),
                  }}
                >
                  {item.price} SR ({t("per_item")})
                </Text>
              ) : (
                ""
              )}
            </Text>
          </View>
          {item?.languages && activeTab === 1 ? (
            <Text style={styles.cardDescription}>
              {renderDescription(item)}
            </Text>
          ) : null}

          {isCart && (
            <Text style={styles.cardPriceText}>
              {item?.subscription?.name || ""}
            </Text>
          )}
          {activeTab == 2 && (
            <TouchableOpacity
              onPress={() => setSubscriptionModal(true)}
              style={styles.subView}
              {...touchableProps}
              // key={i.toString()}
            >
              <Text style={styles.cardText}>
                {
                  subscriptions[activeFontIndex]?.SubscriptionOptionLanguages[
                    common?.lang === "en" ? 0 : 1
                  ]?.title
                }
              </Text>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={ICONS.arrowDown}
              />
            </TouchableOpacity>
          )}

          {orderDetails && (
            <Text style={styles.cardPriceText}>
              Quantity : {item?.quantity}
            </Text>
          )}
          <View
            style={{
              ...styles.cardRow,
              width: metrix.HorizontalSize(248),
              position: "absolute",
              bottom: metrix.VerticalSize(5),
            }}
          >
            <Text style={styles.cardPriceText}> {renderPrice(item)}</Text>
            {order ? null : showSubscribe(item)}
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={styles.cardImage}
        activeOpacity={0.5}
      >
        <Image
          resizeMode="contain"
          style={{
            height: metrix.VerticalSize(200),
            width: metrix.HorizontalSize(120),
          }}
          source={{ uri: item.imagePath }}
        />
      </TouchableOpacity>
    </Fragment>
  );
}
