import React, { useState } from "react";
import { View, Image, Animated, I18nManager } from "react-native";
import { ICONS } from "../../assets/icons";
import { styles } from "./style";
import { Text, CustomButton, Switch } from "../../components";
import { Colors } from "../../config/theme";
import Navigation from "../../navigation/root";
import RNRestart from "react-native-restart";
import { CONSTANTS, setItem } from "../../utils";
import metrix from "../../config/metrix";
import { useDispatch } from "react-redux";
import { setLang } from "../../store/actions/common";
import { useTranslation } from "react-i18next";
import { userSignUp } from "../../store/actions";

function Index(props) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState("00");
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(new Animated.Value(0));

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
      });
  };
  const handleNavigate = () => {
    // let userObj = {
    //   phone,
    // };
    // let formBody = [];
    // for (let property in userObj) {
    //   let encodedKey = encodeURIComponent(property);
    //   let encodedValue = encodeURIComponent(userObj[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // dispatch(userSignUp(formBody));

    dispatch(setLang(CONSTANTS.EN));
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.logo} source={ICONS.logo} />
      <Text style={styles.heading}>{t("select_a_language")}</Text>
      <View style={styles.languageRow}>
        <Text style={styles.langText}>{t("English")}</Text>
        <Switch
          handleToggle={handleToggle}
          value={value}
          isActive={isEnabled}
          bgColor={Colors.primary}
          dotColor={Colors.White}
        />
        <Text style={styles.langText}>{t("Arabic")}</Text>
      </View>
      <CustomButton onPress={handleNavigate}>{t("go")}</CustomButton>
    </View>
  );
}

export default Index;
