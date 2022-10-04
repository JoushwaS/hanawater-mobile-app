import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: metrix.HorizontalSize(18),
  },
  categoryheaderText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18 + 2),
  },
  rowCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistStyle: {
    marginTop: metrix.VerticalSize(10),
    paddingBottom: metrix.VerticalSize(200),
    paddingHorizontal: 0,
  },
  productlistView: {
    // width: metrix.HorizontalSize(330),
    // alignItems: "center",
  },
  filterRow: {
    alignItems: "flex-end",
    marginVertical: metrix.VerticalSize(10),
    marginHorizontal: metrix.HorizontalSize(5),
  },
  iconStyle: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  viewCon: {
    width: metrix.HorizontalSize(150),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(10),
    paddingBottom: metrix.VerticalSize(20),
    marginLeft: metrix.HorizontalSize(10),
  },
  catText: {
    fontSize: metrix.CustomFontSize(13 + 2),
    color: Colors.text,
  },
  catPrice: {
    fontSize: metrix.CustomFontSize(13 + 2),
    color: "#939393",
    marginTop: metrix.VerticalSize(4),
  },
  textPadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(4),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(150),
    borderRadius: metrix.VerticalSize(10),
    height: metrix.VerticalSize(150),
  },
  variationView: {
    width: metrix.HorizontalSize(325),
    height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  variationCard: {
    height: metrix.VerticalSize(80),
    width: metrix.HorizontalSize(80),
    marginRight: metrix.HorizontalSize(15),
    marginTop: metrix.VerticalSize(15),
  },
  variationImg: {
    height: metrix.VerticalSize(80),
    width: metrix.HorizontalSize(80),
  },
  fiterAppliedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(15),
  },
  filterBox: {
    borderRadius: metrix.HorizontalSize(5),
    borderWidth: metrix.HorizontalSize(1),
    borderColor: Colors.LightGrey,
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
    flexDirection: "row",
    alignItems: "center",
  },
  filterBoxText: {
    width: metrix.HorizontalSize(150),
  },
  clearAll: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
