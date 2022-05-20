import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrix.HorizontalSize(15),
    backgroundColor: "white",
  },
  coverImage: {
    height: metrix.VerticalSize(300),
    width: "100%",
  },
  input: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    height: metrix.VerticalSize(43),
    borderColor: Colors.LightGrey,
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  tabText: {
    fontSize: metrix.CustomFontSize(14),
    width: metrix.HorizontalSize(70),
  },
  tab: {
    height: metrix.VerticalSize(30),
    backgroundColor: "white",
    marginBottom: metrix.VerticalSize(10),
    borderBottomColor: "#E0E0FC",
    borderBottomWidth: metrix.VerticalSize(5),
    width: metrix.HorizontalSize(300),
  },
  selectedTab: {
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(28),
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E0E0FC",
  },
  box: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    height: metrix.VerticalSize(43),
    borderColor: Colors.LightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowIcon: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(50),
  },
  buttonStyle: {
    width: "47%",
  },
  row: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(25),
  },
  printName: {
    position: "absolute",
    right: metrix.HorizontalSize(90),
    bottom: metrix.VerticalSize(70),
  },
  firstColumn: {
    flex: 1,
    marginRight: metrix.HorizontalSize(15),
  },
  secondColumn: {
    flex: 1,
  },
  font: {
    marginBottom: metrix.VerticalSize(10),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
  },
});
