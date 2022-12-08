import React, { useState, useEffect, useRef } from "react";

// import MLKitTranslator, { LANG_TAGS } from "./MLKitTranslator";

import {
  Image,
  View,
  Animated,
  TouchableOpacity,
  I18nManager,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
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
const UAN_NUMBER = "920033233";
const VAT_REGISTRATION_NUMBER = "300493487200003";

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
  const [modalVisibleReturnPolicy, setModalVisibleReturnPolicy] =
    useState(false);
  const viewRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { lang, terms, returnPolicies } = useSelector((state) => state.common);
  const { isAuthenticated, customer } = useSelector((state) => state.auth);
  const [term, setTerm] = useState("");
  const [loading, setloading] = useState(false);
  const [textTrans, settextTrans] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [detectLanguageKey, setdetectLanguageKey] = useState("");

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
      name: isAuthenticated ? t("Logout") : t("sign_in_register"),
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
      name: isAuthenticated ? t("Logout") : t("sign_in_register"),
      routeName: SCREENS.AUTH_STACK,
      icon: ICONS.drawer7,
    },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(new Animated.Value(0));

  useEffect(() => {
    terms ? setTerm(terms) : null;
  }, [lang, terms]);
  useEffect(() => {
    returnPolicies ? setReturnPolicy(returnPolicies) : null;
  }, [lang, returnPolicies]);

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
      if (item.name == t("sign_in_register")) {
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
    setloading(true);
    getLanguageSource();
    settextTrans(terms);
    translateText(terms);
    setModalVisible(true);
  };
  const handleReturnPolicyPress = () => {
    Navigation.toggleDrawer();
    setloading(true);
    getLanguageSource();
    translateText();
    settextTrans(returnPolicies);
    setModalVisibleReturnPolicy(true);
  };
  const getLanguageSource = async () => {
    if (modalVisibleReturnPolicy) {
      await axios
        .post(`https://libretranslate.de/detect`, {
          q: returnPolicies,
        })
        .then((response) => {
          console.log("return policy response", response.data[0].language);
          setdetectLanguageKey(response.data[0].language);
        });
    } else if (modalVisible) {
      await axios
        .post(`https://libretranslate.de/detect`, {
          q: terms,
        })
        .then((response) => {
          // console.log("terms response", response.data[0].language);
          setdetectLanguageKey(response.data[0].language);
        })
        .catch((err) => {
          // console.log("error in detecting language ,", err);
        });
    }
  };
  const translateText = async (text) => {
    // getLanguageSource();
    let data = {
      q: textTrans,

      target: i18n.language,
    };
    console.log({ modalVisibleReturnPolicy, modalVisible });
    if (modalVisibleReturnPolicy) {
      await axios
        .post(`https://libretranslate.de/detect`, {
          q: returnPolicies,
        })
        .then((response) => {
          console.log("return policy response", response.data[0].language);
          setdetectLanguageKey(response.data[0].language);
          data["source"] = response.data[0].language;
        });
    } else if (modalVisible) {
      await axios
        .post(`https://libretranslate.de/detect`, {
          q: terms,
        })
        .then((response) => {
          setdetectLanguageKey(response.data[0].language);
          data["source"] = response.data[0].language;
        })
        .catch((err) => {
          console.log("error in detecting language ,", err);
        });
    }

    console.log("detectLanguageKey 22>>>>>", detectLanguageKey);

    console.log("data to translate>>>", data);
    await axios
      .post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        console.log("translated text>>>", response.data.translatedText);
        setloading(false);
        if (modalVisibleReturnPolicy) {
          setReturnPolicy(response.data.translatedText);
        } else if (modalVisible) {
          setTerm(response.data.translatedText);
          // setloading(false);
        }
      })
      .catch((err) => {
        console.log("error in translation,", err.response.data);
      });

    // const options = {
    //   method: "POST",
    //   url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    //   params: {
    //     "to[0]": "ar",
    //     "api-version": "3.0",
    //     profanityAction: "NoAction",
    //     textType: "plain",
    //   },
    //   headers: {
    //     "content-type": "application/json",
    //     "X-RapidAPI-Key": "d2bd1648ccmsh40bb36126be4aefp102f51jsn40c6cf6ac476",
    //     "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    //   },
    //   data: '[{"Text":"IHANA WATER MOBILE APP PRIVACY POLICY & TERMS AND CONDITIONS These are the general Terms & Conditions governing your access and use of the mobile application “Hana Water“ TERMS OF USE The Mobile Applications is preserved and operated by Hana Water. This page states the terms and conditions entered with the company and Its subsidiaries. in respect of which this application is used together with any documents they specifically incorporate by reference (“Terms of Use), govern the access to and use of the Mobile Applications on Appstore. This comprises of any content, services on or from the Mobile application Before accessing the Mobile Application, please read the ‘Terms of Use’ carefully. By accepting those Terms of Use, you agree to abide by these terms and our own Privacy Policy, found at <Website Address of Hana Water> IF YOU DO NOT ACCEPT THE TERMS AND CONDITIONS STATED HERE, PLEASE DO NOT USE THE MOBILE APPLICATION. CHANGES TO THE TERMS OF USE Hana Water reserve the right to change the ‘Terms of Use’, and all new changes shall be effective immediately. If you continue to use the Mobile Application after updating the ‘Terms of Use’, means you agree and accept any of those new changes or modifications. We advise you to keep checking this page regularly to be aware of any changes made to the ‘Terms of Use’. ACCESSING THE MOBILE APPLICATION AND ACCOUNT SECURITY We have the right to change or update the mobile application without any prior notice. We can also restrict or block certain access to some parts or all the Mobile application to any user, including the registered users for any specific reason. You are responsible for ensuring that your private internet connection is aware of these terms of use and should comply with them. You may be asked to provide your Email address to register with Hana Water to access the mobile application. You are responsible in securing your credential details when entering your personal information, such as your user name and password or any other piece of information in the mobile applications. You accept that your account is private to you and should not agree to share it to with any individual that you do not trust. You agree to inform us immediately if any unauthorized person tried to access your account by using your username and password. You also should ensure that you sign off from your account when you finish your session to avoid any fraudulent activity targeting your account. DO NOT USE MORE THAN ONE ACCOUNT as it will result in a breach of these Terms of Use. We have the full authority to remove, disable any username or password, whether created by you or provided by us at any time for any or no reason. The mobile application and website is fully secured as it uses SSL technology, hence that, the information can only be viewed by us. INTELLECTUAL PROPERTY RIGHTS The overall mobile application content, features (including but not limited to all details, software, copies, imageries, videos and artworks ) are fully owned by Hana Water and are strictly protected by the Saudi Arabia and International copyright, trademark, and other intellectual property rights laws. This page states the terms and conditions under which you may use the mobile applications for your personal reference only. Please do not copy, change, modify, create plagiarism, reshare, download, save or communicate any of the materials on our mobile application, website or tenant portal, except as follows; You can store files that are automatically cached by your mobile application, website browser for display improvement purposes. • You can download or print a reasonable number of mobile application screen or pages for your own personal reference, and not for publication or distribution. • Your personal device or computer may store copies in Random- Access Memory ( RAM) after accessing and reading those materials. • You may download a single copy to your mobile devices or personal computer or mobile for your own personal reference. • You can share, repost any social media updates given this feature is available in all social media channels. You do not have the right to change copies of any available materials from this mobile application or republish any contents from this mobile application or website into another external mobile application or website (print, digital, etc). You are also not allowed to use any illustrations, images, videos or any other artworks, copyright, trademarks from the copies of the materials from the mobile application or website All rights and contents on this mobile application or website are fully reserved by the company. Any suspicious activities may lead to serious consequences as it violates the copyright, trademark and other laws. TRADEMARKS Hana Water logos, brand names, design, product or service names, slogans are trademarks of the company, and you must not use it without any official written permission from the company. INFORMATION ABOUT YOU AND YOUR VISITS TO THE MOBILE APPLICATION AND WEBSITE All information we gather in this Mobile Application and Website is subject to our Privacy Policy. By using the Mobile Application and Website, you agree to accept all actions taken by us in accordance to our Privacy Policy. DISCLAIMER OF WARRANTIES You are aware that we do not guarantee the website or the Mobile Application to be fully free of any harmful viruses or any related worms. You are responsible for implementing any anti-virus software to protect your data input and output. HANA WATER WILL NOT BE LIABLE FOR ANY DAMAGES CAUSED BY VIRUSES THAT MAY INFECT YOUR COMPUTER, SOFTWARE PROGRAMS, OR DATA WHILE DOWNLOADING MATERIALS USING THE MOBILE APPLICATION AND WEBSITE. YOU UNDESTRAND THAT THE USE OF THIS MOBILE APPLICATION IS AT YOUR OWN RISK, AND THERE ARE NO WARRANTIES PROVIDED BY US NOR ANYONE WORKING WITHIN THE COMPANY SHOULD GIVE ANY WARRANTIES FOR THE SAME MATTER. THE COMPANY DISCLAIMS ALL TYPE OF WARRANTIES AT ALL TIMES. LIMITATION ON LIABILITY THE COMPANY, SERVICE PROVIDERS, EMPLOYEES OR TOP MANAGEMENTS ARE NOT RESPONSIBLE FOR DAMAGES OF ANY KIND. ALSO, CONTENT ON THE MOBILE APPLICATION AND WEBSITE OR ANY SERVICES PROVIDED FROM THE MOBILE APPLICATION AND WEBSITE IS NOT BY ANY MEANS RESPONSIBLE IN ANY KIND OF PHYSICAL, EMOITIONAL OR TECHNOLOGICAL DAMAGES TO THE USERS. INDEMNIFICATION You accept to protect, insure and hold harmless the company, licensors and service providers, employees, managers, contractors, suppliers, and licensors. GOVERNING LAW AND JURISDICTION Everything related to the Mobile Application and Website and Terms of Use or any claim arising shall be governed by the laws in force in Saudi Arabia. ENTIRE AGREEMENT Without prejudice to our rights under these Terms of Use, if you breach agreement and our Privacy Policy , we may take such action against you. YOUR COMMENTS AND CONCERNS The Mobile Application and Website is fully owned by Hana Water .If you need any technical support or other inquiries relating to the Mobile Application , you can contact us by emailing us at ecommerce@hanawater.com PRIVACY POLICY This mobile application is owned and operated by Hana Water (which term includes all subsidiaries of Hana Water). You will not assist or permit any person to pass or show your personal details or personal identity, and you shall take the full responsibility for maintain privacy and security of your own data. Hana Water and all its subsidiaries are committed to protecting the privacy of all user’s data and providing a secure technological environment for the use of its website or mobile application. Hana Water requests all employees to be responsible for safeguarding their personal details and immediately notify Hana Water and its subsidiaries they belong to, for any unauthorized log in by using your personal information."}]',
    // };
    // const tempData = {
    //   Text: textTrans,
    // };
    // const tempparams = {
    //   "to[0]": i18n.language,
    //   "api-version": "3.0",
    //   profanityAction: "NoAction",
    //   textType: "plain",
    // };
    // await axios
    //   .post(
    //     "https://microsoft-translator-text.p.rapidapi.com/translate",
    //     {
    //       "content-type": "application/json",
    //       "X-RapidAPI-Key":
    //         "d2bd1648ccmsh40bb36126be4aefp102f51jsn40c6cf6ac476",
    //       "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    //     },
    //     tempparams,
    //     tempData
    //   )
    //   .then(function (response) {
    //     console.log(" new translate api >>", response.data);
    //   })
    //   .catch(function (error) {
    //     console.error("new translate api error >>", error.response.data);
    //   });
  };
  useEffect(() => {
    getLanguageSource();
    translateText();
  }, [modalVisible, modalVisibleReturnPolicy, term, returnPolicy]);

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container, opacity: modalVisible ? 0.3 : 1 }}>
        {/* TERM AND CONDITION MODAL */}

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
            <Text style={styles.modalHeading}>{t("Terms_and_conditions")}</Text>
            <View style={{ flex: 1 }}>
              <ScrollView
                scrollEnabled
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ flexGrow: 1 }}
              >
                {loading ? (
                  <ActivityIndicator
                    color={Colors.Theme_Blue}
                    animating
                    size="small"
                    // style={loaderStyle}
                  />
                ) : (
                  <Text style={[styles.modalText, {}]}>{term}</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* RETURN POLICY MODAL */}
        <Modal
          viewRef={viewRef}
          setModalVisible={setModalVisibleReturnPolicy}
          modalVisible={modalVisibleReturnPolicy}
        >
          <View style={styles.modalView}>
            <IconButton
              buttonStyle={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisibleReturnPolicy(false)}
            />
            <Text style={styles.modalHeading}>{t("Return_Policy")}</Text>
            <View style={{ flex: 1 }}>
              <ScrollView
                scrollEnabled
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ flexGrow: 1 }}
              >
                {loading ? (
                  <ActivityIndicator
                    color={Colors.Theme_Blue}
                    animating
                    size="small"
                    // style={loaderStyle}
                  />
                ) : (
                  <Text style={[styles.modalText, {}]}>{returnPolicy}</Text>
                )}
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
            // marginVertical: metrix.VerticalSize(),
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
            <Text
              style={[
                styles.langText,
                { textAlign: I18nManager.isRTL ? "center" : "left" },
              ]}
            >
              {I18nManager.isRTL ? t("English") : t("Arabic")}
            </Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
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

          <TouchableOpacity
            {...touchableProps}
            onPress={handleReturnPolicyPress}
            // style={{ alignItems: I18nManager.isRTL && "center" }}
          >
            <Text
              style={[
                styles.bottomText,
                { textAlign: I18nManager.isRTL ? "center" : "left" },
              ]}
            >
              {t("Return_Policy")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            // marginVertical: metrix.VerticalSize(15),
          }}
        >
          <Text style={styles.nameText}>{t("UAN")}</Text>
          <Text style={styles.bottomTextmt0}>{UAN_NUMBER}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            // marginVertical: metrix.VerticalSize(15),
          }}
        >
          <Text style={styles.nameText}>{t("Vat_Registration_Number")}</Text>
          <Text style={styles.bottomTextmt0}>{VAT_REGISTRATION_NUMBER}</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
