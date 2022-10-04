import React from "react";
import { TouchableOpacity, Animated, I18nManager } from "react-native";
import metrix from "../config/metrix";
import { Colors } from "../config/theme";

const Index = ({ value, handleToggle, dotColor, bgColor }) => {
  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    },
  };
  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={handleToggle}
      style={{
        backgroundColor: bgColor,
        width: metrix.HorizontalSize(55),
        height: metrix.VerticalSize(30),
        borderRadius: metrix.VerticalSize(50),
        // transform: I18nManager.isRTL && [{ rotate: "180deg" }],
        justifyContent: "center",
        paddingHorizontal: metrix.HorizontalSize(4),
        marginHorizontal: metrix.HorizontalSize(17),
      }}
    >
      <Animated.View
        style={{
          backgroundColor: dotColor,
          width: metrix.VerticalSize(20),
          height: metrix.VerticalSize(20),
          borderRadius: metrix.VerticalSize(20 / 2),
          marginLeft: value,
        }}
      />
    </TouchableOpacity>
  );
};
export default Index;
