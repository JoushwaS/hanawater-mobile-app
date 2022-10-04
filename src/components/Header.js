import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  I18nManager,
} from "react-native";
import { Text } from ".";
import Navigation from "../navigation/root";
import Metrix from "../config/metrix";
import { IMAGES } from "../assets/images";
import { SCREENS } from "../config/constants/screens";
import { Colors, Fonts } from "../config/theme";
import { ICONS } from "../assets/icons";
import metrix from "../config/metrix";
import { useTranslation } from "react-i18next";

function Index({
  containerStyle = {},
  text = "",
  fromOTP = false,
  showSearch = false,
  onRightPress = () => {},
  backButton = false,
  rightIcon = null,
  leftIcon = null,
  backText = false,
  orderstatus,
  back,
  icon,
}) {
  const { t } = useTranslation();
  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  const handleLeftPress = () => {
    if (backButton) {
      if (fromOTP) {
        Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
      }
      // if (orderstatus) {
      //   Navigation.navigate(SCREENS.HOME_SCREEN);
      // }
      else {
        Navigation.goBack();
      }
    } else {
      Navigation.toggleDrawer();
    }
  };

  // const handleSearchPress = () => {
  //   Navigation.navigate(SCREENS.SEARCH_SCREEN);
  // };
  // const handleCartDetailsPress = () => {
  //   Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
  // };

  // const handleNotificationPress = () => {
  // Navigation.navigate(SCREENS.NOTIFICATION_SCREEN);
  // };

  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      {!back ? (
        <TouchableOpacity
          {...touchableProps}
          style={styles.leftIcon}
          onPress={handleLeftPress}
        >
          <Image
            style={
              backButton
                ? [
                    styles.backIcon,
                    {
                      transform: I18nManager.isRTL
                        ? [{ rotate: "180deg" }]
                        : [{ rotate: "0deg" }],
                    },
                  ]
                : styles.menuIcon
            }
            resizeMode="contain"
            source={backButton ? IMAGES.backIcon : ICONS.menuIcon}
          />
          {backText && <Text style={styles.backText}>{t("Go back")}</Text>}
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerText}>{text}</Text>
      <View style={styles.rightRow}>
        {/* {showSearch && (
          <TouchableOpacity
            {...touchableProps}
            style={{
              ...styles.rightIcon,
            }}
            onPress={handleNotificationPress}
          >
            <Image
              style={styles.menuIcon}
              resizeMode="contain"
              source={icon ? ICONS.search : ICONS.notificationIcon}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(50),
    backgroundColor: Colors.White,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Metrix.HorizontalSize(25),
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: Metrix.VerticalSize(80),
    width: Metrix.HorizontalSize(120),
  },
  backIcon: {
    height: Metrix.HorizontalSize(16),
    width: Metrix.HorizontalSize(16),
    tintColor: Colors.text,
  },
  menuIcon: {
    height: Metrix.HorizontalSize(22),
    width: Metrix.HorizontalSize(22),
  },
  headerText: {
    fontSize: Metrix.CustomFontSize(20 + 4),
    fontFamily: Fonts.IR,
    marginRight: metrix.HorizontalSize(15),
  },
  backText: {
    fontSize: Metrix.CustomFontSize(20 + 2),
    fontFamily: Fonts.IS,
    marginLeft: metrix.HorizontalSize(15),
  },
  rightIcon: {
    // position: 'absolute',
    // right: 0,
    // zIndex: 250,
  },
  leftIcon: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Index;
