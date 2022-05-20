import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Whatsapp,
  Categories,
  Cart,
  Profile,
  Search,
  ProductListing,
  SubCategories,
} from "../../screens";
import { SCREENS } from "../../config/constants/screens";

const CategoryStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen
        name={SCREENS.CATEGORY_SCREEN}
        component={Categories}
      />
      <CategoryStack.Screen
        name={SCREENS.SUBCATEGORIES}
        component={SubCategories}
      />
      <CategoryStack.Screen
        name={SCREENS.PRODUCT_LISTING_SCREEN}
        component={ProductListing}
      />
    </CategoryStack.Navigator>
  );
};

export default HomeNavigator;
