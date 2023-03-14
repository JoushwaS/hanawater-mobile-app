import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrix.HorizontalSize(20),
    backgroundColor: Colors.White,
    flex: 1,
  },
  editicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    tintColor: Colors.primary,
    alignSelf: "flex-end",
  },
  modalView: {
    width: metrix.HorizontalSize(370),
    height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    justifyContent: "center",

    elevation: 5,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    width: metrix.HorizontalSize(270),

    // paddingBottom: metrix.VerticalSize(50),
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(24 + 2),
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: metrix.VerticalSize(10),
  },
  modalText: {
    textAlign: "center",
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  sortOptions: {
    borderRadius: metrix.HorizontalSize(5),
    maxHeight: metrix.VerticalSize(240),
    backgroundColor: Colors.White,
  },
  editIconContainer: {
    alignSelf: "flex-end",
  },
  input: {
    marginTop: metrix.VerticalSize(25),
  },
  buttonStyle: {
    // alignSelf: "center",
    marginTop: metrix.VerticalSize(25),
    width: metrix.HorizontalSize(70),
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
  emptyText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IM,
    textAlign: "center",
    marginBottom: metrix.VerticalSize(15),
  },
});
