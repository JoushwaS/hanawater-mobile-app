import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
  },
  searchAddress: {
    position: "absolute",
    top: metrix.VerticalSize(20),
  },
  arrowDown: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
  },
  sortOptions: {
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    backgroundColor: "#ffffff",
  },
  sortView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: metrix.HorizontalSize(130),

    backgroundColor: "#ffffff",
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  image: {
    height: metrix.VerticalSize(130),
    width: metrix.HorizontalSize(280),
    borderRadius: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  branchesContainer: {
    position: "absolute",
    bottom: metrix.VerticalSize(80),
    // marginStart: metrix.HorizontalSize(20),

    alignItems: "center",
  },
  rowpadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(30),
    height: metrix.VerticalSize(30),
  },
  loc: {
    resizeMode: "contain",
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
  },
  subheadingText: {
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },

  time: {
    fontSize: metrix.CustomFontSize(14),
    marginLeft: metrix.VerticalSize(10),

    fontFamily: Fonts.IM,
  },
  header: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  box: {
    width: metrix.HorizontalSize(330),
    borderRadius: metrix.VerticalSize(10),
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  Viewcontainer: {
    alignItems: "center",
  },
  newsImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(350),
    height: metrix.VerticalSize(300),
  },
  subscribeText: {
    // textAlign: "center",
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(30),
  },
  buttonStyle: {
    width: "40%",
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  innerImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(80),
    height: metrix.VerticalSize(80),
  },
  address: {
    marginLeft: metrix.VerticalSize(10),
    color: Colors.primary,

    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
  rowContainerBranches: {
    flexDirection: "row",
    width: metrix.HorizontalSize(300),
    justifyContent: "space-between",
  },
});
