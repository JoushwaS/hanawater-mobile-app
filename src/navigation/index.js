import React from "react";
// import { useColorScheme } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  // DarkTheme,
  // DefaultTheme,
} from "@react-navigation/native";
import Navigator from "./root";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";
import { SCREENS } from "../config/constants/screens";
import {
  EditProfile,
  SelectLang,
  AddMoreAddress,
  MapAddress,
  Checkout,
  ThankYou,
  OrderStatus,
  RateUs,
  OrderHistory,
  WebPayment,
  OrderDetails,
} from "../screens";

const Stack = createStackNavigator();

function Navigation() {
  // const scheme = useColorScheme();
  const { lang } = useSelector((state) => state.common);

  return (
    <NavigationContainer ref={(ref) => Navigator.setTopLevelNavigator(ref)}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          {!lang ? (
            <Stack.Screen name={SCREENS.SELECT_LANG} component={SelectLang} />
          ) : (
            <Stack.Screen
              name={SCREENS.MAIN_DRAWER}
              component={DrawerNavigator}
            />
          )}
          <Stack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
          <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
          <Stack.Screen
            name={SCREENS.ADD_MORE_ADDRESS_SCREEN}
            component={AddMoreAddress}
          />
          <Stack.Screen name={SCREENS.MAP_ADDRESS} component={MapAddress} />
          <Stack.Screen name={SCREENS.CHECKOUT_SCREEN} component={Checkout} />
          <Stack.Screen
            name={SCREENS.WEBPAYMENT_SCREEN}
            component={WebPayment}
          />
          <Stack.Screen name={SCREENS.THANK_YOU} component={ThankYou} />
          <Stack.Screen name={SCREENS.ORDER_STATUS} component={OrderStatus} />
          <Stack.Screen name={SCREENS.ORDER_HISTORY} component={OrderHistory} />
          <Stack.Screen name={SCREENS.RATE_US} component={RateUs} />
          <Stack.Screen name={SCREENS.ORDER_DETAILS} component={OrderDetails} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Navigation;
