import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from ".";
import Navigation from "../navigation/root";
import Metrix from "../config/metrix";
import { IMAGES } from "../assets/images";
import { SCREENS } from "../config/constants/screens";
import { Colors, Fonts } from "../config/theme";
import { ICONS } from "../assets/icons";
import metrix from "../config/metrix";

function Circle({ disabled = false, active = false, onPress, conStyle }) {
  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      {...touchableProps}
      style={[styles.circle, conStyle]}
      onPress={onPress}
    >
      {active && <View style={styles.innerCircle} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
});

export default Circle;
