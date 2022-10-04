import { StyleSheet, I18nManager } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: metrix.VerticalSize(25),
    marginHorizontal: metrix.HorizontalSize(18),
  },
  modalView: {
    width: metrix.HorizontalSize(350),
    height: metrix.VerticalSize(230),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  imageModalView: {
    width: metrix.HorizontalSize(300),
    height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  warningModalView: {
    width: metrix.HorizontalSize(300),
    height: metrix.VerticalSize(230),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(20 + 2),
    marginTop: metrix.VerticalSize(13),
    fontFamily: Fonts.IR,
    textAlign: "center",
  },
  monthText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    marginTop: metrix.VerticalSize(15),
    fontFamily: Fonts.IR,
  },
  closeIcon: {
    alignSelf: "flex-end",
    tintColor: "#414141",
    position: "absolute",
    right: metrix.HorizontalSize(25),
    top: metrix.HorizontalSize(25),
    // marginTop: metrix.VerticalSize(-15),
  },
  cardText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.primary,
  },
  rowButton: {
    marginHorizontal: metrix.HorizontalSize(10),
    height: metrix.VerticalSize(41),
    justifyContent: "center",
  },
  tabText: {
    fontSize: metrix.CustomFontSize(14 + 2),
    fontWeight: "bold",
  },
  card: {
    height: metrix.HorizontalSize(174),
    width: metrix.HorizontalSize(392),
    alignSelf: "center",
    paddingVertical: metrix.VerticalSize(30),
    paddingHorizontal: metrix.HorizontalSize(25),
    marginBottom: metrix.VerticalSize(25),
  },
  cardHeading: {
    fontSize: metrix.CustomFontSize(28),
    color: Colors.White,
    fontFamily: Fonts.IS,
    // width: metrix.HorizontalSize(190),
  },
  cardDescription: {
    fontSize: metrix.CustomFontSize(18),
    color: Colors.White,
    fontFamily: Fonts.IR,
    width: metrix.HorizontalSize(250),
    height: metrix.VerticalSize(50),
    lineHeight: metrix.VerticalSize(18),
    marginTop: metrix.VerticalSize(5),
  },
  cardPriceText: {
    fontSize: metrix.CustomFontSize(24),
    color: Colors.White,
    fontFamily: Fonts.IS,
  },
  cardImage: {
    position: "absolute",
    right: 0,
    top: metrix.VerticalSize(10),
  },
  badge: {
    backgroundColor: Colors.BadgeRed,
    width: metrix.HorizontalSize(115),
    paddingHorizontal: metrix.HorizontalSize(15),
    paddingVertical: metrix.VerticalSize(5),
    borderRadius: metrix.VerticalSize(5),
    alignItems: "center",
  },
  badgeText: {
    fontSize: metrix.CustomFontSize(14 + 2),
    color: Colors.White,
  },
  heartIcon: {
    tintColor: Colors.White,
    height: metrix.VerticalSize(23),
    width: metrix.HorizontalSize(23),
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subView: {
    height: metrix.VerticalSize(35),
    width: metrix.HorizontalSize(120),
    backgroundColor: Colors.White,
    marginTop: metrix.VerticalSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: metrix.VerticalSize(8),

    borderRadius: metrix.VerticalSize(2),
  },
  opensubView: {
    height: metrix.VerticalSize(80),
    width: metrix.HorizontalSize(120),
    position: "absolute",
    bottom: 0,
    zIndex: 99999,
    backgroundColor: Colors.White,
    // marginTop: metrix.VerticalSize(10),
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: metrix.VerticalSize(8),
    paddingVertical: metrix.VerticalSize(8),

    borderRadius: metrix.VerticalSize(2),
  },
  icon: {
    width: metrix.VerticalSize(15),
    height: metrix.VerticalSize(15),
    tintColor: Colors.primary,
  },
  subText: {
    fontSize: metrix.CustomFontSize(14 + 2),
    color: Colors.primary,
    fontWeight: "bold",
  },
  catText: {
    fontSize: metrix.CustomFontSize(14 + 2),
    marginRight: metrix.HorizontalSize(40),
    marginBottom: metrix.HorizontalSize(20),
    color: Colors.White,
  },
  tab: {
    width: metrix.HorizontalSize(120),
    height: metrix.VerticalSize(45),
    justifyContent: "center",
    alignItems: "center",
  },
  mapView: {
    height: metrix.VerticalSize(230),
    backgroundColor: "lightgrey",
  },
  clearIcon: {
    position: "absolute",
    top: metrix.VerticalSize(I18nManager.isRTL ? 40 : 20),
    left: metrix.HorizontalSize(15),
    zIndex: 500,
  },
  iVat: {
    fontSize: metrix.CustomFontSize(13),
    color: "white",
  },
});