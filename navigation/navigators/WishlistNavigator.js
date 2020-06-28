import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import WishlistScreen from "../../screens/shop/WishlistScreen";
import ProductDetailsScreen, {
  screenOptions as productDetailsScreenOptions,
} from "../../screens/shop/ProductDetailsScreen";

const WishlistStackNavigator = createStackNavigator();

export const WishlistNavigator = () => {
  return (
    <WishlistStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <WishlistStackNavigator.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: false,
        }}
      />
      <WishlistStackNavigator.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={productDetailsScreenOptions}
      />
    </WishlistStackNavigator.Navigator>
  );
};
