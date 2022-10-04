import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // paddingHorizontal: metrix.HorizontalSize(15),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  locationtextStyle: {
    marginLeft: metrix.HorizontalSize(10),
    width: metrix.HorizontalSize(250),
  },
  addnewAddress: {
    fontSize: metrix.CustomFontSize(15 + 2),
    fontFamily: Fonts.IR,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15 + 2),
  },
  terms: {
    fontSize: metrix.CustomFontSize(13 + 2),
    fontFamily: Fonts.IR,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  shippingBox: {
    padding: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(20),
    borderRadius: metrix.HorizontalSize(10),
    backgroundColor: Colors.dullgrey,
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    resizeMode: "contain",
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  shippingViewContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  checkBox: {
    width: metrix.VerticalSize(18),
    height: metrix.VerticalSize(18),
    marginRight: metrix.HorizontalSize(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(2),
    borderColor: Colors.text,
    borderWidth: metrix.VerticalSize(2),
  },
  shipping: {
    fontSize: metrix.CustomFontSize(18 + 2),
    marginBottom: metrix.VerticalSize(15),
    marginTop: metrix.VerticalSize(10),
    fontFamily: Fonts.IS,
  },
  paymentText: {
    textAlign: "left",
    marginLeft: metrix.HorizontalSize(20),
    fontSize: metrix.CustomFontSize(14 + 2),
  },
  input: {
    height: metrix.VerticalSize(50),
    alignItems: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    // alignItems: "center",

    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(20),

    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
  },
  rowContainerSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),

    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
  },
  buttonStyle: {
    width: "37%",
    marginTop: metrix.VerticalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IS,
  },
});
