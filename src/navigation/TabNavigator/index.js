import React from "react";
import { Platform, View, Linking } from "react-native";
import { ICONS } from "../../assets/icons";
import { FavouritesScreen, Profile, CartDetails } from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
import HomeNavigator from "../HomeStack";
import { IconButton, Text } from "../../components";
import { SCREENS } from "../../config/constants/screens";
import { useSelector } from "react-redux";
import metrix from "../../config/metrix";

const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    id: "T001",
    name: SCREENS.HOME_SCREEN,
    image: ICONS.tab1,
  },
  {
    id: "T002",
    name: SCREENS.CART_DETAILS_SCREEN,
    image: ICONS.tab2,
  },

  {
    id: "T003",
    name: SCREENS.PROFILE,
    image: ICONS.tab4,
  },
  {
    id: "T004",
    name: SCREENS.PROFILE,
    image: ICONS.tab5,
  },
];

function HomeTabNavigator(props) {
  const { items } = useSelector((state) => state.cart);
  return (
    <Tab.Navigator
      tabBarVisible={true}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(tabProps) => (
        <MyTabBar
          items={items?.length ? items?.length : 0}
          {...tabProps}
          {...props}
        />
      )}
    >
      <Tab.Screen name={SCREENS.HOME_NAVIGATOR} component={HomeNavigator} />
      <Tab.Screen name={SCREENS.CART_DETAILS_SCREEN} component={CartDetails} />
      {/* <Tab.Screen name={SCREENS.WISHLIST_SCREEN} component={FavouritesScreen} /> */}
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
}

const MyTabBar = ({ state, navigation, items }) => {
  const handleOnPress = (route, index) => {
    if (index === 3) {
      let url = "whatsapp://send?text=&phone=966115208680";
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          if (Platform.OS == "android") {
            Linking.openURL("market://details?id=com.whatsapp");
          } else if (Platform.OS === "ios") {
            Linking.openURL("itms-apps://itunes.apple.com/app/id310633997");
          }
        });
    } else {
      navigation.navigate(route.name);
    }
  };
  return (
    <View style={styles.container}>
      {tabRoutes.map((route, index) => {
        const isFocused = state.index == index;
        return (
          <View
            key={index.toString()}
            style={{
              // backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              width: metrix.VerticalSize(38),
              height: metrix.VerticalSize(38),
            }}
          >
            <IconButton
              icon={route.image}
              onPress={() => handleOnPress(route, index)}
              iconStyle={{ ...styles.icon }}
            />
            {index === 1 && (
              <View style={styles.cartView}>
                <Text style={styles.cartText}>{items}</Text>
              </View>
            )}
            {isFocused && <View style={styles.circle} />}
          </View>
        );
      })}
    </View>
  );
};

export default HomeTabNavigator;
