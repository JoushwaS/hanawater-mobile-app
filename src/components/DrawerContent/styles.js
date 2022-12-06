import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  colContainer: {
    alignItems: "center",
  },
  routeContainer: {
    // marginHorizontal: metrix.HorizontalSize(22),
    marginTop: metrix.VerticalSize(50),
    width: metrix.HorizontalSize(356),
  },
  nameText: {
    color: Colors.White,
    fontSize: metrix.CustomFontSize(24 + 2),
    marginTop: metrix.VerticalSize(20),
    fontFamily: Fonts.IR,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(19),
  },
  bottomTextmt0: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.White,
    // marginTop: metrix.VerticalSize(20),
    fontFamily: Fonts.IR,
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
  },
  modalText: {
    textAlign: "justify",
    fontSize: metrix.CustomFontSize(12 + 2),
    // textAlign: "center",
  },
  avatarimg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(87.6),
    height: metrix.VerticalSize(87.6),
  },
  langText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.White,
    fontFamily: Fonts.IR,
  },
  bottomText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.White,
    marginTop: metrix.VerticalSize(20),
    fontFamily: Fonts.IR,
  },
  switch: {
    marginHorizontal: metrix.HorizontalSize(17),
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(22),
  },
});
