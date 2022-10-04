import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: "center",
  },
  logo: {
    width: metrix.HorizontalSize(228.5),
    height: metrix.VerticalSize(88),
    marginTop: metrix.VerticalSize(240),
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(90),
    marginBottom: metrix.VerticalSize(73),
  },
  heading: {
    marginTop: metrix.VerticalSize(53),
    fontFamily: Fonts.IR,
    fontSize: metrix.CustomFontSize(22 + 2),
    // fontWeight: "bold",
  },
  langText: {
    // fontWeight: "bold",
    fontSize: metrix.CustomFontSize(22 + 2),
  },
  switch: {
    marginHorizontal: metrix.HorizontalSize(17),
  },
});
