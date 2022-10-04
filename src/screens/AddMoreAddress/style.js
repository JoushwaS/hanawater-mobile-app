import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    alignItems: "center",
  },
  headingText: {
    textAlign: "center",
    fontFamily: Fonts.IS,
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18 + 2),
  },
  topContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  icon: {
    width: metrix.HorizontalSize(35),
    height: metrix.HorizontalSize(35),
    marginBottom: metrix.VerticalSize(50),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  locationtextStyle: {
    fontSize: metrix.CustomFontSize(22),
    fontFamily: Fonts.IR,
    width: "90%",
  },
  address: {
    fontFamily: Fonts.IR,
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrix.VerticalSize(20),
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  rowContainer: {
    flexDirection: "row",
  },
  shippingBox: {
    paddingVertical: metrix.VerticalSize(16),
    paddingHorizontal: metrix.HorizontalSize(22),
    width: metrix.HorizontalSize(346),
    marginLeft: metrix.HorizontalSize(20),
    marginBottom: metrix.VerticalSize(15),
    borderRadius: metrix.HorizontalSize(5),
    backgroundColor: Colors.textInputView,
  },
  inputView: {
    backgroundColor: "#F3F3F3",
    borderColor: "transparent",
    marginBottom: metrix.VerticalSize(20),
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    resizeMode: "contain",
  },
  deleteIcon: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    marginLeft: metrix.HorizontalSize(10),
    resizeMode: "contain",
    tintColor: Colors.primary,
  },
  delete: {
    position: "absolute",
    right: metrix.HorizontalSize(15),
    top: metrix.VerticalSize(10),
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
});
