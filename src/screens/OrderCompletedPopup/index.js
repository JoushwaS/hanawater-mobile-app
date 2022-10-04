import React, { forwardRef } from "react";
import { ScrollView, View } from "react-native";
import styles from "./style";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  return (
    <View>
      <Header text="Login" />
      <Screen {...props} />
    </View>
  );
}

export default Index;
