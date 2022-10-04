import React from "react";
import { Text, StyleSheet } from "react-native";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

function Index({ style = {}, size = 20, children, numberOfLines }) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: Colors.text,
          fontFamily: Fonts.IR,
          fontSize: metrix.VerticalSize(size),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export default Index;
