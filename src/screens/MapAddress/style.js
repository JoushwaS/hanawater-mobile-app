import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IS,
  },
  image: {
    height: metrix.VerticalSize(30),
    width: metrix.HorizontalSize(30),
    marginRight: metrix.HorizontalSize(16),
  },
  branchesContainer: {
    position: "absolute",
    bottom: metrix.VerticalSize(0),
  },
  searchAddress: {
    position: "absolute",
    top: metrix.VerticalSize(0),
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
  input: {
    width: metrix.VerticalSize(250),
    backgroundColor: "transparent",
  },
  subheadingText: {
    fontSize: metrix.CustomFontSize(15 + 2),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },

  time: {
    fontSize: metrix.CustomFontSize(14 + 2),
    marginLeft: metrix.VerticalSize(10),
    fontFamily: Fonts.IM,
  },
  header: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  box: {
    width: metrix.HorizontalSize(380),
    backgroundColor: Colors.White,
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  searchbox: {
    width: metrix.HorizontalSize(385),
    backgroundColor: Colors.White,
    position: "absolute",
    justifyContent: "center",
    marginTop: metrix.VerticalSize(19),
    borderRadius: metrix.VerticalSize(5),
    alignSelf: "center",
  },
  Viewcontainer: {
    alignItems: "center",
  },
  markerFixed: {
    width: metrix.VerticalSize(45),
    height: metrix.VerticalSize(45),
    zIndex: 1,
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  newsImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(350),
    height: metrix.VerticalSize(300),
  },
  subscribeText: {
    // textAlign: "center",
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15 + 2),
    fontFamily: Fonts.IR,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(30),
  },
  buttonStyle: {
    alignSelf: "center",
    position: "absolute",
    bottom: metrix.VerticalSize(92),
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

    fontSize: metrix.CustomFontSize(14 + 2),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
});
