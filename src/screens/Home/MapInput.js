import React from "react";
import { View, TextInput } from "react-native";
import { ICONS } from "../../assets/icons";
import { IconButton, Text } from "../../components";
import { Colors } from "../../config/theme";
import { styles } from "./styles";

export default function MapInput({}) {
  return (
    <View style={styles.inputView}>
      <TextInput
        placeholderTextColor={Colors.LightGrey}
        maxLength={56}
        style={styles.input}
      />
      <IconButton icon={ICONS.locationIcon} iconStyle={styles.iconButton} />
    </View>
  );
}
