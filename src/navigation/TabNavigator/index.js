import React, { useState, useRef } from "react";
import { Image, View, FlatList } from "react-native";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { Home, Whatsapp, WishlistScreen, Cart, Profile } from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
import HomeNavigator from "../HomeStack";
import CategoryNavigator from "../CategoryStack";

import { Tooltip } from "react-native-elements";
import CategoryCard from "../../components/CategoryCard";
import IconButton from "../../components/IconButton";
import { Text } from "../../components";
import metrix from "../../config/metrix";
import { IMAGES } from "../../assets/images";
import { SCREENS } from "../../config/constants/screens";
import { useDispatch } from "react-redux";
import { opneModal } from "../../store/actions";

const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    id: "T001",
    name: SCREENS.HOME_SCREEN,
    image: ICONS.tab1,
  },
  {
    id: "T002",
    name: "Whatsapp",
    image: ICONS.tab2,
  },
  {
    id: "T004",
    name: "Categories",
    image: ICONS.tab3,
  },
  {
    id: "T004",
    name: SCREENS.WISHLIST_SCREEN,
    image: ICONS.heartIcon,
  },
  {
    id: "T005",
    name: SCREENS.PROFILE,
    image: ICONS.tab5,
  },
];
const data = [
  {
    name: "Women",
    image: IMAGES.cat1,
    id: 1,
  },
  {
    name: "Men",
    image: IMAGES.cat2,
    id: 2,
  },
  {
    name: "Office",
    image: IMAGES.cat3,
    id: 3,
  },
  {
    name: "Office",
    image: IMAGES.cat3,
    id: 3,
  },
  {
    name: "Office",
    image: IMAGES.cat3,
    id: 3,
  },
  {
    name: "Office",
    image: IMAGES.cat3,
    id: 3,
  },
];
// const [toolTipVisible, settoolTipVisible] = useState(true);

function HomeTabNavigator(props) {
  return (
    <Tab.Navigator
      tabBarVisible={true}
      // barStyle={{ backgroundColor: "red", borderRadius: 20 }}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(tabProps) => <MyTabBar {...tabProps} {...props} />}
    >
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tab.Screen name="Whatsapp" component={Whatsapp} />
      <Tab.Screen name="Categories" component={CategoryNavigator} />
      <Tab.Screen name={SCREENS.WISHLIST_SCREEN} component={WishlistScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
}

const MyTabBar = ({ state, navigation }) => {
  const tooltipRef = useRef(null);
  const dispatch = useDispatch();
  // const [toolTipVisible, settoolTipVisible] = useState(true);

  return (
    <View style={styles.container}>
      {tabRoutes.map((route, index) => {
        const isFocused = state.index === index;

        const handleonPress = () => {
          if (!isFocused) {
            if (route.name == "Categories") {
              console.log("if", route.name);
              // dispatch(opneModal());
              // tooltipRef.current.toggleTooltip();
              navigation.navigate(route.name);
            } else {
              dispatch(opneModal());
              console.log("else", route.name);

              navigation.navigate(route.name);
            }
          }
        };
        if (isFocused) {
          return (
            <View key={index.toString()} style={{ alignItems: "center" }}>
              <IconButton
                icon={route.image}
                onPress={handleonPress}
                iconStyle={{ tintColor: Colors.primary }}
              />
              <View style={styles.circle}></View>
            </View>
          );
        } else {
          return (
            <View key={index.toString()} style={{ alignItems: "center" }}>
              <IconButton
                icon={route.image}
                onPress={handleonPress}
                iconStyle={{ tintColor: Colors.tabDefault }}
              />
              <View
                style={[styles.circle, { backgroundColor: Colors.White }]}
              ></View>
            </View>
          );
        }
      })}
    </View>
  );
};

export default HomeTabNavigator;
