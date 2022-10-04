import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_NEW,
  ORDER_STATUS_ONROUTE,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_RESCHEDULE,
} from "../../config/constants";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

function Index({ children, onPress = () => {}, type }) {
  const renderColor = (type) => {
    switch (type) {
      case ORDER_STATUS_NEW:
        return Colors.onhold;
      case ORDER_STATUS_CANCELLED:
        return Colors.cancelled;
      case ORDER_STATUS_ONROUTE:
        return Colors.onhold;
      case ORDER_STATUS_RESCHEDULE:
        return Colors.primary;
      case ORDER_STATUS_DELIVERED:
        return Colors.completed;
      case ORDER_STATUS_PENDING:
        return Colors.pending;
      default:
        return Colors.pending;
    }
  };

  const renderTextColor = (type) => {
    switch (type) {
      case ORDER_STATUS_DELIVERED:
        return Colors.completedText;
      case ORDER_STATUS_CANCELLED:
        return Colors.cancelledText;
      case ORDER_STATUS_PENDING:
        return Colors.pendingText;
      case ORDER_STATUS_NEW:
        return Colors.onholdText;
      case ORDER_STATUS_ONROUTE:
        return Colors.onholdText;
      default:
        return Colors.pendingText;
    }
  };

  const renderText = (type) => {
    switch (type) {
      case ORDER_STATUS_DELIVERED:
        return ORDER_STATUS_DELIVERED;
      case ORDER_STATUS_CANCELLED:
        return ORDER_STATUS_CANCELLED;
      case ORDER_STATUS_PENDING:
        return ORDER_STATUS_PENDING;
      case ORDER_STATUS_NEW:
        return ORDER_STATUS_NEW;
      default:
        return ORDER_STATUS_PENDING;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={true}
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
        {type}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    padding: metrix.VerticalSize(5),
    borderRadius: metrix.VerticalSize(5),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(34),
    width: metrix.HorizontalSize(105),
  },
  textStyle: {
    textAlign: "center",
    color: Colors.White,
    fontFamily: Fonts.IM,
    fontSize: metrix.CustomFontSize(16),
  },
});

export default Index;
