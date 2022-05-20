import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import IconButton from "../../components/IconButton";
import { Text, Button } from "../../components";
import Quantity from "../../components/Quantity";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import { styles } from "./styles";

function Index({
  buttonStyle = {},
  data = {},
  Textstyle = {},
  imageStyle = {},
  buttonText = "Print My Name",
  onPress = () => {},
}) {
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: "row" }}>
        <Image source={data?.image} style={styles.cartImage} />
        <View style={styles.textContainer}>
          <Text style={styles.productname}>{data?.name}</Text>
          <Text style={styles.productprice}>{data?.price}</Text>
          <Text style={styles.productprice}>{data?.variation}</Text>
        </View>
      </View>
      <View style={styles.QuantityViewRow}>
        <Quantity />
        <Button
          onPress={onPress}
          buttonStyle={styles.buttonStyle}
          variant="outlined"
        >
          {buttonText}
        </Button>
      </View>
      <View style={styles.iconContainer}>
        <IconButton iconStyle={styles.closeIcon} icon={IMAGES.closeIcon} />
      </View>
    </View>
  );
}

export default Index;
