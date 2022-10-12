import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  Animated,
  TouchableOpacity,
  I18nManager,
  ScrollView,
} from "react-native";
import { ICONS } from "../../assets/icons";
import styles from "./styles";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerButton from "../DrawerButton";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { userLogout } from "../../store/actions";
import { Switch, Modal, IconButton, Text } from "../../components";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import { CONSTANTS, getItem } from "../../utils";
import { setLang } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import RNRestart from "react-native-restart";
import { IMAGES } from "../../assets/images";
import { getTerms } from "../../config/api/promotions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DrawerContent = (props) => {
  const touchableProps = {
    activeOpacity: 0.5,
    style: {
      marginLeft: metrix.HorizontalSize(51),
    },
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const viewRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { lang, terms } = useSelector((state) => state.common);
  const { isAuthenticated, customer } = useSelector((state) => state.auth);
  const [term, setTerm] = useState("");
  console.log("term", term);
  const loggedInrouteOrders = [
    {
      name: t("home"),
      routeName: SCREENS.HOME_SCREEN,
      icon: ICONS.tab1,
    },
    {
      name: t("Orders"),
      routeName: SCREENS.ORDER_HISTORY,
      icon: ICONS.tab2,
    },
    {
      name: t("profile"),
      routeName: SCREENS.PROFILE,
      icon: ICONS.tab4,
    },
    {
      name: t("Addresses"),
      routeName: SCREENS.ADD_MORE_ADDRESS_SCREEN,
      icon: ICONS.drawer4,
    },
    {
      name: isAuthenticated ? t("Logout") : t("sign_in"),
      routeName: SCREENS.AUTH_STACK,
      icon: ICONS.drawer7,
    },
  ];
  const routeOrders = [
    {
      name: t("home"),
      routeName: SCREENS.HOME_SCREEN,
      icon: ICONS.tab1,
    },

    {
      name: isAuthenticated ? t("Logout") : t("sign_in"),
      routeName: SCREENS.AUTH_STACK,
      icon: ICONS.drawer7,
    },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // getTerms();
    console.log("terms", terms);
    terms ? setTerm(terms) : null;
  }, [lang, terms]);

  const handleToggle = () => {
    setIsEnabled((prevState) => !prevState);
    isEnabled
      ? Animated.spring(value, {
          toValue: metrix.HorizontalSize(2),
          duration: 400,
          useNativeDriver: false,
        }).start()
      : Animated.timing(value, {
          toValue: metrix.HorizontalSize(28),
          duration: 220,
          useNativeDriver: false,
        }).start();
    i18n
      .changeLanguage(i18n.language === "en" ? CONSTANTS.AR : CONSTANTS.EN)
      .then(I18nManager.forceRTL(i18n.language === "ar"))
      .then(() => {
        RNRestart.Restart();
        dispatch(setLang(i18n.language === "en" ? CONSTANTS.AR : CONSTANTS.EN));
      });
  };

  const handleOnDrawerItemPress = (item) => {
    // console.log("draweritemitem", item);
    if (item.name == t("Logout") && isAuthenticated) {
      dispatch(userLogout());
      Navigation.toggleDrawer();
    } else {
      Navigation.closeDrawer();
      if (item.name == t("sign_in")) {
        Navigation.navigate(item.routeName, {
          screen: SCREENS.REGISTER_SCREEN,
          params: {
            cart: false,
          },
        });
      } else {
        Navigation.navigate(item.routeName);
      }
    }
  };

  const handleTermsPress = () => {
    Navigation.toggleDrawer();
    setModalVisible(true);
  };

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container, opacity: modalVisible ? 0.3 : 1 }}>
        <Modal
          viewRef={viewRef}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        >
          <View style={styles.modalView}>
            <IconButton
              buttonStyle={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.modalHeading}>Terms & Conditions</Text>
            <View style={{ flex: 1 }}>
              <ScrollView
                scrollEnabled
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ flexGrow: 1 }}
              >
                <Text style={[styles.modalText, {}]}>{term}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={styles.colContainer}>
          <Image source={ICONS.avatar} style={styles.avatarimg} />
          <Text style={styles.nameText}>
            {isAuthenticated ? customer?.firstName : t("MyAccount")}
          </Text>
        </View>
        <View style={styles.routeContainer}>
          {isAuthenticated
            ? loggedInrouteOrders.map((item, index) => (
                <DrawerButton
                  key={index.toString()}
                  onPress={handleOnDrawerItemPress}
                  item={item}
                />
              ))
            : routeOrders.map((item, index) => (
                <DrawerButton
                  key={index.toString()}
                  onPress={handleOnDrawerItemPress}
                  item={item}
                />
              ))}
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: metrix.VerticalSize(15),
          }}
        >
          <Text style={styles.nameText}>{t("Change Language")}</Text>
          <View style={styles.languageRow}>
            <Text style={styles.langText}>
              {I18nManager.isRTL ? t("Arabic") : t("English")}
            </Text>
            <Switch
              handleToggle={handleToggle}
              value={value}
              isActive={isEnabled}
              bgColor={Colors.White}
              dotColor={Colors.primary}
            />
            <Text style={styles.langText}>
              {I18nManager.isRTL ? t("English") : t("Arabic")}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          {...touchableProps}
          onPress={handleTermsPress}
          // style={{ alignItems: I18nManager.isRTL && "center" }}
        >
          <Text
            style={[
              styles.bottomText,
              { textAlign: I18nManager.isRTL ? "center" : "left" },
            ]}
          >
            {t("Terms_and_conditions")}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          {...touchableProps}
        >
          <Text
            style={[
              styles.bottomText,
              { textAlign: I18nManager.isRTL ? "center" : "left" },
            ]}
          >
            {t("Privacy Policy")}
          </Text>
        </TouchableOpacity> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
