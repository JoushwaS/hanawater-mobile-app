import React from "react";
import { Touchable } from "react-native";
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Text } from ".";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

function Index({
  textStyle = {},
  buttonStyle = {},
  loaderStyle = {},
  children,
  loading = false,
  onPress = () => {},
  variant = "filled",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.button,
        buttonStyle,
        {
          backgroundColor: variant === "filled" ? Colors.primary : Colors.White,
          borderWidth: metrix.VerticalSize(2),
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={Colors.Theme_Blue}
          animating
          size="small"
          style={loaderStyle}
        />
      ) : (
        <Text
          style={[
            styles.textStyle,
            {
              color: variant === "filled" ? Colors.White : Colors.primary,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    padding: metrix.VerticalSize(12),
    borderRadius: metrix.VerticalSize(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primary,
  },
  textStyle: {
    alignSelf: "center",
    color: Colors.White,
    fontFamily: Fonts.IS,
  },
});

export default Index;
