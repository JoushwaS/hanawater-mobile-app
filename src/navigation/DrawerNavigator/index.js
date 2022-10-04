import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import HomeTabNavigator from "../TabNavigator";
import DrawerContent from "../../components/DrawerContent";

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
          backgroundColor: Colors.primary,
          width: metrix.HorizontalSize(345),
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
