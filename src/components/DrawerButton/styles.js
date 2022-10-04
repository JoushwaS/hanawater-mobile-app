import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: metrix.HorizontalSize(356),
    marginTop: metrix.VerticalSize(30),
    // backgroundColor: "red",
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderWidth: metrix.VerticalSize(1),
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  colContainer: {
    alignItems: "center",
    marginTop: metrix.VerticalSize(20),
  },
  iconImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(25),
    height: metrix.VerticalSize(25),
    tintColor: Colors.White,
  },
  iconRTLImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    tintColor: Colors.White,
  },
  downarrowImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(10),
    height: metrix.VerticalSize(10),
  },
  drawerText: {
    color: Colors.White,
    marginLeft: metrix.HorizontalSize(15),
    fontSize: metrix.CustomFontSize(20 + 2),
  },
  rowContainer: {
    flexDirection: "row",
    marginLeft: metrix.HorizontalSize(15),

    alignItems: "center",
    // width: metrix.HorizontalSize(300),
  },
  drawerItemheight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(19),
    marginHorizontal: metrix.HorizontalSize(22),
  },
  avatarimg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(70),
    height: metrix.VerticalSize(70),
  },
});
