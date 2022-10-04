import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  image: {
    width: metrix.HorizontalSize(180),
    height: metrix.VerticalSize(185),
    alignSelf: "center",
    marginTop: metrix.VerticalSize(65),
  },
  clockImage: {
    width: metrix.VerticalSize(118),
    height: metrix.VerticalSize(118),
    alignSelf: "center",
    marginTop: metrix.VerticalSize(35),
  },
  heading: {
    fontSize: metrix.CustomFontSize(24 + 2),
    marginTop: metrix.VerticalSize(35),
    marginBottom: metrix.VerticalSize(43),
    alignSelf: "center",
    fontFamily: Fonts.IM,
  },
  subHeading: {
    fontSize: metrix.CustomFontSize(18 + 2),
    marginBottom: metrix.VerticalSize(37),
    marginTop: metrix.VerticalSize(40),
    alignSelf: "center",
    color: Colors.text,
  },
  button: {
    alignSelf: "center",
    marginTop: metrix.VerticalSize(35),
  },
  line: {
    width: metrix.HorizontalSize(178),
    borderBottomColor: Colors.primary,
    borderBottomWidth: metrix.VerticalSize(2),
    marginBottom: metrix.VerticalSize(10),
    marginHorizontal: metrix.HorizontalSize(16),
  },
  orderStatusView: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  textRow: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
});
