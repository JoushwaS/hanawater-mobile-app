import React, { useState } from "react";
import { Image, View, ImageBackground, TouchableOpacity } from "react-native";
import { ICONS } from "../../assets/icons";
import Animated from "react-native-reanimated";
import styles from "./styles";
import { Text } from "..";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerButton from "../DrawerButton";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

const routeOrders = [
  {
    name: "Home",
    routeName: SCREENS.HOME_SCREEN,
    icon: ICONS.drawer1,
  },
  {
    name: "Categories",
    routeName: "BookmarkNavigator",
    icon: ICONS.drawer2,
    children: [
      {
        name: "Women",
        routeName: SCREENS.CATEGORY_SCREEN,
      },
      {
        name: "Men",
        routeName: SCREENS.CATEGORY_SCREEN,
      },
      {
        name: "Office",
        routeName: SCREENS.CATEGORY_SCREEN,
      },
      {
        name: "Travel",
        routeName: SCREENS.CATEGORY_SCREEN,
      },
      {
        name: "Gift Sets",
        routeName: SCREENS.CATEGORY_SCREEN,
      },
    ],
  },
  {
    name: "Store Locator",
    routeName: "STORE_LOCATOR",
    icon: ICONS.drawer3,
  },
  {
    name: "About",
    routeName: SCREENS.OUR_HISTORY,
    children: [
      {
        name: "History",
        routeName: SCREENS.OUR_HISTORY,
      },
    ],
    icon: ICONS.drawer4,
  },

  {
    name: "Help",
    routeName: "BuyAndRenew",
    children: [
      {
        name: "FAQ",
        routeName: "Faqs",
      },
      {
        name: "Leather Care",
        routeName: "LEATHER_CARE",
      },
      {
        name: "Privacy Policy",
        routeName: "PrivacyPolicy",
      },
      {
        name: "Terms & Conditions",
        routeName: "TermsAndCondition",
      },
    ],
    icon: ICONS.drawer10,
  },
  {
    name: "My Account",
    routeName: "BuyAndRenew",
    children: [
      {
        name: "Edit Profile",
        routeName: SCREENS.PROFILE,
      },
      {
        name: "Order History",
        routeName: SCREENS.ORDER_HISTORY,
      },
      {
        name: "Address",
        routeName: SCREENS.ADD_MORE_ADDRESS_SCREEN,
      },
      {
        name: "Wishlist",
        routeName: SCREENS.WISHLIST_SCREEN,
      },
      {
        name: "NewsLetter Subscription",
        routeName: SCREENS.NEWSLETTER_SUBSCRIPTION,
      },
    ],
    icon: ICONS.drawer12,
  },
  {
    name: "Contact Us",
    routeName: SCREENS.CONTACT_US,
    icon: ICONS.drawer11,
  },
  {
    name: "Notifications",
    routeName: SCREENS.NOTIFICATION_SCREEN,
    icon: ICONS.drawer6,
  },
  {
    name: "Cooperate Enquiry",
    routeName: SCREENS.COOPERATE_ENQUIRY,
    icon: ICONS.drawer6,
  },

  {
    name: "Log In",
    routeName: "AuthStack",
    icon: ICONS.drawer7,
  },
];

const DrawerContent = (props) => {
  const [support, openSupport] = useState(true);

  const progress = 1;
  const opacity = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-5, 1],
  });

  const handleOnDrawerItemPress = (routeName, opensupport) => {
    Navigation.navigate(routeName);
  };

  const handleOnLogout = () => {
    props.navigation.navigate("AuthStack", {
      screen: "InitialScreen",
    });
  };

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.container]}>
        <Animated.View style={{ opacity: opacity }}>
          <View style={styles.colContainer}>
            <Image source={ICONS.avatar} style={styles.avatarimg} />
            <Text style={styles.nameText}>Guest</Text>
          </View>
        </Animated.View>
        <Animated.View style={styles.routeContainer}>
          {routeOrders.map((item, index) => {
            return (
              <DrawerButton
                key={index.toString()}
                index={index}
                showSupport={support}
                onPress={handleOnDrawerItemPress}
                item={item}
              />
            );
          })}
        </Animated.View>
      </Animated.View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;
