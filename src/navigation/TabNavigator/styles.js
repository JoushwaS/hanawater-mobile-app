import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    position: "absolute",
    bottom: metrix.VerticalSize(0),
    alignSelf: "center",
    shadowColor: "#000",
    flexDirection: "row",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowRadius: 1,
    borderTopLeftRadius: metrix.VerticalSize(15),
    borderTopRightRadius: metrix.VerticalSize(15),
    // borderBottomLeftRadius: metrix.VerticalSize(15),
    // borderBottomRightRadius: metrix.VerticalSize(15),
    height: metrix.VerticalSize(55),
    width: metrix.HorizontalSize(380),
  },
  box: {
    width: metrix.HorizontalSize(300),
    // paddingTop: metrix.VerticalSize(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(20),
    // bottom: metrix.VerticalSize(90),
    // height: metrix.VerticalSize(250),
    backgroundColor: "white",
  },
  icon: {
    width: metrix.HorizontalSize(22),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
  viewCon: {
    width: metrix.HorizontalSize(80),
    // backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(10),
    paddingBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),
    alignItems: "center",
    marginHorizontal: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(80),
    height: metrix.VerticalSize(80),
  },
  circle: {
    width: metrix.HorizontalSize(4),
    height: metrix.VerticalSize(4),
    borderRadius: metrix.VerticalSize(2),
    marginTop: metrix.VerticalSize(2),
    backgroundColor: Colors.primary,
  },
});
