import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  icon: {
    width: metrix.HorizontalSize(25),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
  paymentIcon: {
    width: metrix.HorizontalSize(50),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
});
