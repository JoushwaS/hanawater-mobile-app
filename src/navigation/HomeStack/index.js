import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  AddMoreAddress,
  MosqueProducts,
  OurHistory,
  ContactUs,
} from "../../screens";
import { SCREENS } from "../../config/constants/screens";

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <HomeStack.Screen
        name={SCREENS.MOSQUE_PRODUCTS}
        component={MosqueProducts}
      />
      <HomeStack.Screen
        name={SCREENS.ADD_MORE_ADDRESS_SCREEN}
        component={AddMoreAddress}
      />
      <HomeStack.Screen name={SCREENS.CONTACT_US} component={ContactUs} />
      {/* <HomeStack.Screen
        name={SCREENS.NOTIFICATION_SCREEN}
        component={Notification}
      /> */}
      <HomeStack.Screen name={SCREENS.OUR_HISTORY} component={OurHistory} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
