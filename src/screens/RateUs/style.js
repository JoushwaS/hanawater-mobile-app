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
    width: metrix.HorizontalSize(110),
    height: metrix.VerticalSize(118),
    alignSelf: "center",
  },
  heading: {
    fontSize: metrix.CustomFontSize(24 + 2),
    marginTop: metrix.VerticalSize(50),
    alignSelf: "center",
    fontFamily: Fonts.IM,
  },
  subHeading: {
    fontSize: metrix.CustomFontSize(18 + 2),
    alignSelf: "center",
    color: Colors.text,
  },
  button: {
    // alignSelf: "center",
  },
  orderStatusView: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  textRow: {
    flexDirection: "row",
    alignContent: "center",
    marginVertical: metrix.VerticalSize(15),
    marginHorizontal: metrix.HorizontalSize(33),
  },
  rating: {
    marginVertical: metrix.VerticalSize(40),
  },
  btnRow: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(25),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
