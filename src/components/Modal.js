import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "../config/theme";

export default function Index({
  children,
  viewRef,
  modalVisible = false,
  setModalVisible = () => {},
  animationType = "fade",
}) {
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      ref={viewRef}
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      // propagateSwipe={true}
    >
      {/* <TouchableOpacity
        // activeOpacity={0.5}
        onPress={closeModal}
        style={styles.modalView}
      > */}
      <View activeOpacity={0.5} style={styles.modalView}>
        <View>{children}</View>
        {/* <TouchableHighlight>{children}</TouchableHighlight> */}
      </View>
      {/* </TouchableOpacity> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    // opacity: 0.8,
    // backgroundColor: Colors.Black,
  },
});
