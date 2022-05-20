import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { ICONS } from "../../assets/icons";
import { Text } from "..";

import { styles } from "./styles";

function Index({
  buttonStyle = {},
  icon = {},
  iconStyle = {},
  onPress = () => {},
}) {
  const [quantity, setQuantity] = useState(1);
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View style={styles.QuantityContainer}>
      <TouchableOpacity
        {...touchableProps}
        onPress={decreaseQuantity}
        style={styles.plus}
      >
        <Image source={ICONS.minus} style={styles.plusminusIcon} />
      </TouchableOpacity>
      <Text style={styles.productQuantity}>{quantity}</Text>
      <TouchableOpacity
        {...touchableProps}
        onPress={increaseQuantity}
        style={styles.plus}
      >
        <Image source={ICONS.plus} style={styles.plusminusIcon} />
      </TouchableOpacity>
    </View>
  );
}

export default Index;
