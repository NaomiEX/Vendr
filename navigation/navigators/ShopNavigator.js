import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../screens/shop/HomeScreen";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../../screens/shop/SearchScreen";
import CategoriesOverviewScreen from "../../screens/shop/CategoriesOverviewScreen";
import CategoryScreen, {
  screenOptions as categoryScreenOptions,
} from "../../screens/shop/CategoryScreen";
import ProductsScreen, {
  screenOptions as productsScreenOptions,
} from "../../screens/shop/ProductsScreen";
import ProductDetailsScreen, {
  screenOptions as productDetailsScreenOptions,
} from "../../screens/shop/ProductDetailsScreen";
import CartScreen from "../../screens/shop/CartScreen";
import OrdersScreen from "../../screens/shop/OrdersScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../../screens/user/EditProductScreen";

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
      <ShopStackNavigator.Screen
        name="Category"
        component={CategoryScreen}
        options={categoryScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Products"
        component={ProductsScreen}
        options={productsScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={productDetailsScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
      <ShopStackNavigator.Screen name="Cart" component={CartScreen} />
      <ShopStackNavigator.Screen name="Orders" component={OrdersScreen} />
    </ShopStackNavigator.Navigator>
  );
};
