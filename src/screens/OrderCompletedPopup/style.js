import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10000,
  },
  orderCompletedText: {
    fontSize: metrix.CustomFontSize(20),
  },
  buttonStyle: {
    width: "47%",

    marginTop: metrix.VerticalSize(50),
  },
  giftImage: {
    width: metrix.HorizontalSize(120),
    height: metrix.VerticalSize(150),
    marginLeft: metrix.HorizontalSize(50),

    marginBottom: metrix.VerticalSize(30),
    resizeMode: "contain",
  },
  giftImagesmall: {
    width: metrix.HorizontalSize(80),
    height: metrix.VerticalSize(80),
    marginBottom: metrix.VerticalSize(10),
    resizeMode: "contain",
  },
  orderCompletedThanksText: {
    fontSize: metrix.CustomFontSize(14),
    textAlign: "center",
    marginTop: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(220),
  },
  orderIDText: {
    fontSize: metrix.CustomFontSize(15),
    marginTop: metrix.VerticalSize(30),
  },
});
