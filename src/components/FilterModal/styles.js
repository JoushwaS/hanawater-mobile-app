import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalView: {
    flex: 1,
  },
  filterView: {
    width: metrix.HorizontalSize(300),
    height: metrix.VerticalSize(),
    position: "absolute",
    right: 0,
    backgroundColor: Colors.White,
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(25),
    opacity: 0.95,
    zIndex: 500,
  },
  heading: {
    marginVertical: metrix.VerticalSize(15),
    fontWeight: "bold",
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(40),
    marginBottom: metrix.VerticalSize(15),
  },
  colorIcon: {
    height: metrix.HorizontalSize(24),
    width: metrix.HorizontalSize(24),
    borderRadius: metrix.HorizontalSize(24 / 2),
  },
  border: {
    borderWidth: metrix.HorizontalSize(2),
    height: metrix.HorizontalSize(35),
    width: metrix.HorizontalSize(35),
    borderRadius: metrix.HorizontalSize(35 / 2),
    justifyContent: "center",
    alignItems: "center",
    marginRight: metrix.HorizontalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  categoryButton: {
    height: metrix.VerticalSize(35),
    width: metrix.HorizontalSize(75),
    borderRadius: metrix.HorizontalSize(5),
    borderWidth: metrix.HorizontalSize(1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: metrix.HorizontalSize(15),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(15),
    justifyContent: "space-between",
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: metrix.VerticalSize(15),
  },
  sortView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  arrowDown: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  sortOptions: {
    borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
  },
  buttonStyle: {
    marginTop: metrix.VerticalSize(30),
    width: metrix.HorizontalSize(120),
    alignSelf: "center",
  },
});
