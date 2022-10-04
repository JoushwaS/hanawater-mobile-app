import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrix.HorizontalSize(20),
    backgroundColor: Colors.White,
    flex: 1,
  },
  input: {
    marginTop: metrix.VerticalSize(25),
  },
  buttonStyle: {
    alignSelf: "center",
    marginTop: metrix.VerticalSize(35),
  },
  cityView: {
    backgroundColor: Colors.inputBG,
    borderBottomLeftRadius: metrix.VerticalSize(5),
    borderBottomRightRadius: metrix.VerticalSize(5),
    paddingBottom: metrix.VerticalSize(5),
  },
  cityText: {
    paddingHorizontal: metrix.HorizontalSize(15),
    paddingVertical: metrix.VerticalSize(5),
  },
  text: {
    fontSize: metrix.CustomFontSize(14 + 2),
    fontFamily: Fonts.IM,
    marginTop: metrix.VerticalSize(25),
  },
  addressContainer: {
    height: metrix.VerticalSize(50),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.inputBG,
    marginTop: metrix.VerticalSize(10),
  },
});
