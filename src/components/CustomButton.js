import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from ".";
import { IMAGES } from "../assets/images";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

function Index({
  textStyle = {},
  style = {},
  children,
  onPress = () => {},
  type = "small",
  variant = "filled",
  isLoading = false,
  disabled = false,
}) {
  const styles = StyleSheet.create({
    button: {},
    textStyle: {
      alignSelf: "center",
      color: Colors.White,
      fontFamily: Fonts.IR,
      fontSize: metrix.CustomFontSize(18),
    },
    btnBackground: {
      width: metrix.HorizontalSize(type === "small" ? 120 : 180),
      height: metrix.VerticalSize(50),
      justifyContent: "center",
    },
  });

  const renderBgImage = (type, variant) => {
    if (type === "small" && variant === "filled") {
      return IMAGES.btnBg;
    } else if (type === "small" && variant === "outlined") {
      return IMAGES.btnBgOutlined;
    } else if (type === "large" && variant === "filled") {
      return IMAGES.tabBg;
    } else if (type === "large" && variant === "outlined") {
      return IMAGES.tabBgOutlined;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <ImageBackground
        style={styles.btnBackground}
        resizeMode="contain"
        source={renderBgImage(type, variant)}
      >
        {isLoading ? (
          <ActivityIndicator
            color={variant === "outlined" ? Colors.primary : Colors.White}
          ></ActivityIndicator>
        ) : (
          <Text style={[styles.textStyle, textStyle]}>{children}</Text>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Index;
