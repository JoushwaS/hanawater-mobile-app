import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // alignItems: "center",
  },
  image: {
    width: metrix.VerticalSize(400),
    height: metrix.VerticalSize(365),
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: metrix.VerticalSize(80),
  },
  heading: {
    fontSize: metrix.CustomFontSize(24 + 2),
    marginTop: metrix.VerticalSize(26),
    marginBottom: metrix.VerticalSize(43),
    alignSelf: "center",
    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  subHeading: {
    fontSize: metrix.CustomFontSize(16 + 2),
    marginBottom: metrix.VerticalSize(50),
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
