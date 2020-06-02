import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen, {
  screenOptions as accountScreenOptions,
} from "../../screens/user/AccountScreen";
import UserProductsScreen from "../../screens/user/UserProductsScreen";

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
        name="UserProducts"
        component={UserProductsScreen}
      />
    </AccountStackNavigator.Navigator>
  );
};
