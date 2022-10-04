import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Fonts } from "../../config/theme";
import { Colors } from "../../config/theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  containerStyle: {
    marginTop: metrix.VerticalSize(112),
    alignItems: "center",
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  headingText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(22 + 2),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(88),
    marginBottom: metrix.VerticalSize(35),
  },
  boxinput: {
    fontSize: metrix.CustomFontSize(20 + 2),
    backgroundColor: "transparent",
  },
  box: {
    width: metrix.VerticalSize(60),
    height: metrix.VerticalSize(60),
    borderRadius: metrix.VerticalSize(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.inputBG,
  },
  logo: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(228.5),
    height: metrix.VerticalSize(87),
  },
  buttonRow: {
    marginTop: metrix.VerticalSize(76),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPWText: {
    fontSize: metrix.CustomFontSize(15 + 2),
    color: Colors.primary,
    textDecorationLine: "underline",
    fontFamily: Fonts.IR,
  },
  subText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(16 + 2),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    // width: metrix.HorizontalSize(320),
    marginBottom: metrix.VerticalSize(34),
  },
  refershIcon: {
    width: metrix.HorizontalSize(18),
    height: metrix.VerticalSize(18),
    marginLeft: metrix.HorizontalSize(8),
  },
  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: metrix.VerticalSize(55),
  },
  timerText: {
    fontSize: metrix.CustomFontSize(15 + 2),
    textAlign: "center",
    color: Colors.text,
    marginTop: metrix.VerticalSize(32),
  },
  resendText: {
    fontSize: metrix.CustomFontSize(16 + 2),
    textAlign: "center",
    color: Colors.text,
  },
});
