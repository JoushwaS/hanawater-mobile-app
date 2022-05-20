import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

function Index({ children, onPress = () => {}, type = 0 }) {
  const renderColor = (type) => {
    switch (type) {
      case 0:
        return Colors.completed;
      case 1:
        return Colors.cancelled;
      case 2:
        return Colors.pending;
      case 3:
        return Colors.onhold;
      default:
        return Colors.onhold;
    }
  };

  const renderTextColor = (type) => {
    switch (type) {
      case 0:
        return Colors.completedText;
      case 1:
        return Colors.cancelledText;
      case 2:
        return Colors.pendingText;
      case 3:
        return Colors.onholdText;
      default:
        return Colors.onholdText;
    }
  };

  const renderText = (type) => {
    switch (type) {
      case 0:
        return "Completed";
      case 1:
        return "Cancelled";
      case 2:
        return "Pending";
      case 3:
        return "On Hold";
      default:
        return "On Hold";
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.button,
        {
          backgroundColor: renderColor(type),
        },
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          {
            color: renderTextColor(type),
          },
        ]}
      >
        {renderText(type)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    padding: metrix.VerticalSize(5),
    borderRadius: metrix.VerticalSize(25),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(34),
    width: metrix.HorizontalSize(100),
  },
  textStyle: {
    textAlign: "center",
    color: Colors.White,
    fontFamily: Fonts.IM,
    fontSize: metrix.CustomFontSize(13),
  },
});

export default Index;
