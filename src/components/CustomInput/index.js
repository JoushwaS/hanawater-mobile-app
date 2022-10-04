import React from "react";
import { Touchable } from "react-native";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { Button } from "../../components";

import { Colors } from "../../config/theme";
import { styles } from "./styles";

function Index({
  buttonStyle = {},
  icon = {},
  iconStyle = {},
  inputContainerStyle = {},
  placeholder = "",
  onPress = () => {},
}) {
  return (
    <View style={[styles.InputContainer, inputContainerStyle]}>
      <View style={styles.inputRow}>
        <TextInput
          autoFocus={false}
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderTextColor}
        />
        {icon && <Image source={icon} style={styles.searchImg} />}
      </View>
    </View>
  );
}

export default Index;
