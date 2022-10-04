import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  plus: {
    height: metrix.VerticalSize(30),
    width: metrix.VerticalSize(30),
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.White,
    borderWidth: metrix.VerticalSize(2),
    borderRadius: metrix.VerticalSize(30 / 2),
  },
  QuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(10),
    width: metrix.HorizontalSize(70),
    justifyContent: "space-between",
    marginHorizontal: metrix.HorizontalSize(15),
  },
  plusminusIcon: {
    width: metrix.HorizontalSize(15),
    resizeMode: "contain",
    height: metrix.VerticalSize(15),
    tintColor: Colors.White,
  },
  productQuantity: {
    fontSize: metrix.CustomFontSize(22),
    color: Colors.White,
    marginHorizontal: metrix.HorizontalSize(5),
    fontFamily: Fonts.IR,
  },
});
