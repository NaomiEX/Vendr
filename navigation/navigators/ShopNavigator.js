import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../screens/shop/HomeScreen";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../../screens/shop/SearchScreen";
import CategoriesOverviewScreen from "../../screens/shop/CategoriesOverviewScreen";
import CategoryScreen from "../../screens/shop/CategoryScreen";
import ProductsScreen from "../../screens/shop/ProductsScreen";
import ProductDetailsScreen from "../../screens/shop/ProductDetailsScreen";
import CartScreen from "../../screens/shop/CartScreen";
import OrdersScreen from "../../screens/shop/OrdersScreen";

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
      <ShopStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Categories Overview"
        component={CategoriesOverviewScreen}
      />
      <ShopStackNavigator.Screen name="Category" component={CategoryScreen} />
      <ShopStackNavigator.Screen name="Products" component={ProductsScreen} />
      <ShopStackNavigator.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <ShopStackNavigator.Screen name="Cart" component={CartScreen} />
      <ShopStackNavigator.Screen name="Orders" component={OrdersScreen} />
    </ShopStackNavigator.Navigator>
  );
};
