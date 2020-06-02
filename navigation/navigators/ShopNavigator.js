import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../screens/shop/HomeScreen";
import CartScreen from "../../screens/shop/CartScreen";

import { defaultNavOptions } from "../defaultNavOptions";

const ShopStackNavigator = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ShopStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ShopStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <ShopStackNavigator.Screen name="Cart" component={CartScreen} />
    </ShopStackNavigator.Navigator>
  );
};
