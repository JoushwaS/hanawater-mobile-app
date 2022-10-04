import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { IMAGES } from "../../assets/images";
import { CustomButton, Text } from "../../components";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

function Index({ onButtonPress }) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={IMAGES.noInternet}
      ></Image>
      <Text style={styles.heading}>No Internet Connection</Text>
      <Text style={styles.subHeading}>
        You are not connected to the internet.Make sure your Wi-Fi is on and
        Airplane mode is off.
      </Text>
      <CustomButton type="large" onPress={onButtonPress}>
        Retry
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: metrix.HorizontalSize(22),
  },
  image: {
    height: metrix.VerticalSize(200),
    width: metrix.VerticalSize(200),
    tintColor: Colors.primary,
  },
  heading: {
    fontSize: metrix.CustomFontSize(22 + 2),
    fontFamily: Fonts.IS,
  },
  subHeading: {
    fontSize: metrix.CustomFontSize(16 + 2),
    fontFamily: Fonts.IR,
    textAlign: "center",
    marginTop: metrix.VerticalSize(20),
    marginBottom: metrix.VerticalSize(35),
  },
});
export default Index;
