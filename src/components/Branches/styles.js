import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export default styles = StyleSheet.create({
  address: {
    marginLeft: metrix.VerticalSize(10),
    color: Colors.primary,

    fontSize: metrix.CustomFontSize(14 + 2),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
  image: {
    height: metrix.VerticalSize(130),
    width: metrix.HorizontalSize(280),
    borderRadius: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  box: {
    width: metrix.HorizontalSize(330),
    borderRadius: metrix.VerticalSize(10),
    alignItems: "center",
    marginLeft: metrix.HorizontalSize(15),
    backgroundColor: "#ffffff",
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  time: {
    fontSize: metrix.CustomFontSize(14 + 2),
    marginLeft: metrix.VerticalSize(10),

    fontFamily: Fonts.IM,
  },
  loc: {
    resizeMode: "contain",
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
  },
  rowpadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
  },
});
