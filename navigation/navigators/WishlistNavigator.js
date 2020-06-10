import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import WishlistScreen from "../../screens/shop/WishlistScreen";

const WishlistStackNavigator = createStackNavigator();

export const WishlistNavigator = () => {
  return (
    <WishlistStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <WishlistStackNavigator.Screen
        name="Wishlist"
        component={WishlistScreen}
      />
    </WishlistStackNavigator.Navigator>
  );
};
