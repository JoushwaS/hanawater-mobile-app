import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from ".";
import Navigation from "../navigation/root";
import Metrix from "../config/metrix";
import { IMAGES } from "../assets/images";
import { SCREENS } from "../config/constants/screens";
import { Colors } from "../config/theme";
import metrix from "../config/metrix";
import { ICONS } from "../assets/icons";

function Index({
  containerStyle = {},
  textStyle = {},
  text = null,
  showSearch = false,
  onRightPress = () => {},
  backButton = false,
  rightIcon = null,
  leftIcon = null,
}) {
  const touchableProps = {
    activeOpacity: 0.5,
  };

  const handleLeftPress = () => {
    backButton ? Navigation.goBack() : Navigation.toggleDrawer();
  };

  const handleSearchPress = () => {
    Navigation.navigate(SCREENS.SEARCH_SCREEN);
  };
  const handleCartDetailsPress = () => {
    Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
  };

  const handleNotificationPress = () => {
    Navigation.navigate(SCREENS.NOTIFICATION_SCREEN);
  };

  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      <TouchableOpacity
        {...touchableProps}
        style={styles.leftIcon}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={handleLeftPress}
      >
        <Image
          style={backButton ? styles.backIcon : styles.menuIcon}
          resizeMode="contain"
          source={backButton ? IMAGES.backIcon : IMAGES.menuIcon}
        />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={IMAGES.logoWhite}
      />
      <View style={styles.rightRow}>
        <TouchableOpacity
          {...touchableProps}
          style={{
            ...styles.rightIcon,
            marginRight: metrix.HorizontalSize(12),
          }}
          onPress={handleNotificationPress}
        >
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={ICONS.notificationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          {...touchableProps}
          style={styles.rightIcon}
          onPress={handleCartDetailsPress}
        >
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={ICONS.cartIcon}
          />
        </TouchableOpacity>

        {showSearch && (
          <TouchableOpacity
            {...touchableProps}
            style={{
              ...styles.rightIcon,
              marginLeft: Metrix.HorizontalSize(15),
            }}
            onPress={handleSearchPress}
          >
            <Image
              style={styles.menuIcon}
              resizeMode="contain"
              source={IMAGES.searchIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(80),
    backgroundColor: Colors.Theme_Blue,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomLeftRadius: metrix.HorizontalSize(30),
    borderBottomRightRadius: metrix.HorizontalSize(30),
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
    height: Metrix.HorizontalSize(15),
    width: Metrix.HorizontalSize(15),
  },
  menuIcon: {
    height: Metrix.HorizontalSize(20),
    width: Metrix.HorizontalSize(20),
  },
  rightIcon: {
    // position: 'absolute',
    // right: 0,
    // zIndex: 250,
  },
  leftIcon: {
    justifyContent: "center",
  },
});

export default Index;
