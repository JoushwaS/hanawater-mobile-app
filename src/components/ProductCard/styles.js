import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  icon: {
    width: metrix.HorizontalSize(22),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
  viewCon: {
    width: metrix.HorizontalSize(150),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),
    marginHorizontal: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  heartIcon: {
    width: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(15),
    resizeMode: "contain",
  },
  circle: {
    width: metrix.VerticalSize(28.4),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(28.4),
    borderRadius: metrix.VerticalSize(14.2),
    marginRight: metrix.HorizontalSize(10),
    marginTop: metrix.HorizontalSize(15),
    backgroundColor: Colors.White,
  },
  catText: {
    fontSize: metrix.CustomFontSize(13 + 2),
    color: Colors.text,
    // textAlign: "center",
  },
  catPrice: {
    fontSize: metrix.CustomFontSize(13 + 2),
    color: "#939393",
    marginTop: metrix.VerticalSize(4),

    // textAlign: "center",
  },
  textPadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(4),
  },
  Catimg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(150),
    // borderRadius: metrix.VerticalSize(10),
    alignItems: "flex-end",
    height: metrix.VerticalSize(150),
  },
  varImg: {
    resizeMode: "contain",
    borderRadius: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(40),

    height: metrix.VerticalSize(40),
  },
});
