import React from "react";
import { Touchable } from "react-native";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";

function Index({
  buttonStyle = {},
  icon = {},
  iconStyle = {},
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 25, bottom: 25, left: 50, right: 50 }}
      style={buttonStyle}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Image source={icon} style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
}

export default Index;
