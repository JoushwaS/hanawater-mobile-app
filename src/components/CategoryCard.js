import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from ".";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

function Index({ data = {}, onPress = () => {}, viewConStyle, imageStyle }) {
  return (
    <TouchableOpacity
      style={[styles.viewCon, viewConStyle]}
      onPress={() => onPress(data.item.name)}
    >
      <Image source={data.item.image} style={[styles.Catimg, imageStyle]} />
      <Text style={styles.catText}>{data.item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCon: {
    width: metrix.HorizontalSize(100),
    marginLeft: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
    textAlign: "center",
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(100),
  },
});

export default Index;
