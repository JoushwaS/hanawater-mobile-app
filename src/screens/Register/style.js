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
  closeIcon: {
    alignSelf: "flex-end",
    tintColor: "#414141",
  },
  modalView: {
    width: metrix.HorizontalSize(365),
    height: metrix.VerticalSize(350),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(22 + 2),
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: metrix.VerticalSize(10),
    // fontSize: metrix.CustomFontSize(22 + 2),
    // textAlign: "center",
    // marginBottom: metrix.VerticalSize(10),
    // fontFamily: Fonts.IS,
  },
  modalText: {
    textAlign: "justify",
    fontSize: metrix.CustomFontSize(12 + 2),
    // fontSize: metrix.CustomFontSize(18 + 2),
    // textAlign: "center",
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(30),
  },
  headingText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(26 + 2),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(88),
    marginBottom: metrix.VerticalSize(47),
  },
  subHeading: {
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IR,
    // marginTop: metrix.VerticalSize(15),
    marginLeft: metrix.HorizontalSize(14),
  },
  logo: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(228.5),
    height: metrix.VerticalSize(87),
  },
  buttonStyle: {
    marginTop: metrix.VerticalSize(72),
  },
  forgotPWText: {
    fontSize: metrix.CustomFontSize(15 + 2),
    color: Colors.primary,
    textDecorationLine: "underline",
    fontFamily: Fonts.IR,
  },
  privacyRow: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(25),
    alignItems: "center",
  },
});
