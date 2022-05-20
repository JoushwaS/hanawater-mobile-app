import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  Carouselimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(380),
    height: metrix.VerticalSize(200),
    justifyContent: "center",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: metrix.HorizontalSize(370),
    justifyContent: "space-between",
  },
  arrowViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: metrix.HorizontalSize(375),
  },
  leftarrowicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  categoryTextContainer: {
    marginBottom: metrix.VerticalSize(20),
    position: "absolute",
    bottom: 0,
    marginLeft: metrix.HorizontalSize(10),
  },
  imageCon: {
    width: metrix.HorizontalSize(380),
    height: metrix.VerticalSize(200),
  },
  Catimg: {
    resizeMode: "cover",
    alignItems: "flex-end",
    marginTop: metrix.VerticalSize(1),
    justifyContent: "flex-end",
    width: metrix.HorizontalSize(380),
    height: metrix.VerticalSize(170),
  },
  Catimgrow: {
    resizeMode: "cover",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: metrix.HorizontalSize(187),
    height: metrix.VerticalSize(200),
  },
  catCon: {
    width: metrix.HorizontalSize(200),
    // height: metrix.HorizontalSize(200),
  },
  flatlistStyle: {
    marginTop: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(150),
  },
  flatlistConStyle: {
    // marginTop: metrix.VerticalSize(20),
    // paddingBottom: metrix.VerticalSize(200),
  },
  dot: {
    width: metrix.HorizontalSize(9),
    height: metrix.HorizontalSize(9),
    borderRadius: metrix.HorizontalSize(4.5),
    // borderWidth: metrix.HorizontalSize(4),

    backgroundColor: Colors.Black,
  },
  containerpadding: {
    marginTop: metrix.VerticalSize(25),
    paddingBottom: metrix.VerticalSize(80),
  },
  categoryViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(3),
  },
  paginationstyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: metrix.VerticalSize(198),
  },
  inactiveDot: {
    width: metrix.HorizontalSize(9),
    height: metrix.HorizontalSize(9),
    borderRadius: metrix.HorizontalSize(4.5),
    // borderWidth: metrix.HorizontalSize(4),

    backgroundColor: "#C4C4C4",
  },
  headerText: {
    fontSize: metrix.CustomFontSize(18),
    marginLeft: metrix.HorizontalSize(15),
    // textAlign: "center",
  },
  viewCon: {
    width: metrix.HorizontalSize(100),
    marginLeft: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(14),
    marginRight: metrix.HorizontalSize(40),
    marginBottom: metrix.HorizontalSize(20),

    color: Colors.White,
  },
  carouselText: {
    fontSize: metrix.CustomFontSize(16),
    marginRight: metrix.HorizontalSize(40),
    // marginBottom: metrix.HorizontalSize(20),

    color: Colors.White,
  },
  carouselsecondText: {
    fontSize: metrix.CustomFontSize(20),
    marginRight: metrix.HorizontalSize(40),
    // marginBottom: metrix.HorizontalSize(20),

    color: Colors.White,
  },
});
