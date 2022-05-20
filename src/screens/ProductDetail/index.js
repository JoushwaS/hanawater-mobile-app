import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import BottomTabs from "../../navigation/BottomTabs";

function Index(props) {
  return (
    <>
      <Header backButton showSearch />
      <ScrollView style={styles.container}>
        <Screen {...props} />
      </ScrollView>
    </>
  );
}

export default Index;