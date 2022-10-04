import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingHorizontal: metrix.HorizontalSize(18),
  },
  ratingBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cancelText: {
    // marginTop: metrix.VerticalSize(10),
    fontFamily: Fonts.IS,
  },
  commentRow: { flexDirection: "row", marginTop: metrix.VerticalSize(5) },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(10),
  },
  rating: {
    marginBottom: metrix.VerticalSize(2),
  },
  tabView: {
    height: metrix.VerticalSize(45),
    marginTop: metrix.VerticalSize(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: metrix.VerticalSize(2),
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  paymentText: {
    textAlign: "left",
    marginLeft: metrix.HorizontalSize(20),
    fontSize: metrix.CustomFontSize(14 + 2),
    color: "#878889",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: metrix.VerticalSize(20),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  modalBtn: {
    alignSelf: "center",
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(21 + 2),
    color: Colors.primary,
    textAlign: "center",
    marginTop: metrix.VerticalSize(3),
    marginBottom: metrix.VerticalSize(25),
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  modalView: {
    width: metrix.HorizontalSize(365),
    height: metrix.VerticalSize(384),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  tabText: {
    fontSize: metrix.CustomFontSize(16 + 2),
    fontFamily: Fonts.IS,
    marginHorizontal: metrix.HorizontalSize(20),
    paddingVertical: metrix.VerticalSize(15),
  },
  image: {
    height: metrix.VerticalSize(130),
    width: metrix.VerticalSize(130),
  },
  dateText: {
    fontSize: metrix.CustomFontSize(15.5 + 2),
    fontFamily: Fonts.IR,
    marginTop: metrix.VerticalSize(7),
    color: Colors.text,
  },
  detailText: {
    fontSize: metrix.CustomFontSize(14 + 2),
    fontFamily: Fonts.IR,
    marginVertical: metrix.VerticalSize(7),
  },
  orderNoText: {
    fontSize: metrix.CustomFontSize(22 + 2),
    fontFamily: Fonts.IM,
    color: Colors.text,
  },
  tabActive: {
    color: Colors.primary,
  },
  listView: {
    paddingVertical: metrix.VerticalSize(23),
    paddingHorizontal: metrix.HorizontalSize(14),
  },
  listView2: {
    paddingBottom: metrix.VerticalSize(23),
    paddingHorizontal: metrix.HorizontalSize(14),
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: metrix.VerticalSize(25),
  },
  detailsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: metrix.HorizontalSize(5),
    width: metrix.HorizontalSize(180),
    alignSelf: "flex-end",
  },
  deliveryDetailRow: {
    flexDirection: "row",
    marginBottom: metrix.HorizontalSize(15),
    alignItems: "center",
  },
  detailCard: {
    backgroundColor: Colors.textInputView,
    marginBottom: metrix.VerticalSize(13),
    borderRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderCard: {
    backgroundColor: Colors.textInputView,
    marginVertical: metrix.VerticalSize(13),
    borderRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(20),
    width: metrix.HorizontalSize(353),
    alignSelf: "flex-end",
  },
  icon: {
    height: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(20),
    marginRight: metrix.HorizontalSize(15),
  },
  title: {
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IR,
    textAlign: "center",
    marginTop: metrix.VerticalSize(25),
  },
  subTitle: {
    fontSize: metrix.CustomFontSize(18 + 2),
    fontFamily: Fonts.IR,
    marginVertical: metrix.VerticalSize(15),
  },
  typeView: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-evenly",
    marginVertical: metrix.VerticalSize(20),
  },
  grandTotal: {
    fontSize: metrix.CustomFontSize(20 + 2),
    fontFamily: Fonts.IM,
    alignSelf: "flex-end",
    color: Colors.text,
  },
  commentText: {
    fontSize: metrix.CustomFontSize(20 + 2),
    fontFamily: Fonts.IM,
    color: Colors.text,
  },
  btnRow: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(35),
    justifyContent: "space-between",
  },
  bottomBtn: {
    alignSelf: "center",
    marginTop: metrix.VerticalSize(15),
  },
  star: {
    height: metrix.VerticalSize(22),
    width: metrix.VerticalSize(22),
  },
});
