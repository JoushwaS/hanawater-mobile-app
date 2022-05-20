import React from "react";
import { useColorScheme, Image, View } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import HomeTabNavigator from "../TabNavigator";
import DrawerContent from "../../components/DrawerContent";
import { AddMoreAddress } from "../../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(screenProps) => {
        return <DrawerContent {...screenProps} />;
      }}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#1F336D",
          width: metrix.HorizontalSize(300),
        },
        sceneContainerStyle: {
          // backgroundColor: "#000000",
        },
      }}
    >
      <Drawer.Screen name="TabNavigator" component={HomeTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
