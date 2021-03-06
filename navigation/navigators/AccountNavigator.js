import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen, {
  screenOptions as accountScreenOptions,
} from "../../screens/user/AccountScreen";
import UserProductsScreen from "../../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../../screens/user/EditProductScreen";
import EditProfileScreen from "../../screens/settings/EditProfileScreen";
import ProductDetailsScreen, {
  screenOptions as productDetailsScreenOptions,
} from "../../screens/shop/ProductDetailsScreen";
import OrderHistoryScreen, {
  screenOptions as orderHistoryScreenOptions,
} from "../../screens/user/OrderHistoryScreen";

import { defaultNavOptions } from "../defaultNavOptions";

const AccountStackNavigator = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AccountStackNavigator.Screen
        name="Account"
        component={AccountScreen}
        options={accountScreenOptions}
      />
      <AccountStackNavigator.Screen
        name="User Products"
        component={UserProductsScreen}
      />
      <AccountStackNavigator.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
      <AccountStackNavigator.Screen
        name="Edit Profile"
        component={EditProfileScreen}
      />
      <AccountStackNavigator.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={productDetailsScreenOptions}
      />
      <AccountStackNavigator.Screen
        name="Order History"
        component={OrderHistoryScreen}
      />
    </AccountStackNavigator.Navigator>
  );
};
