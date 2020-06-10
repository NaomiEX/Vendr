import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from "../../screens/user/UserProductsScreen";

const UserProductsStackNavigator = createStackNavigator();

export const UserProductsNavigator = () => {
  return (
    <UserProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStackNavigator.Screen
        name="User Products"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
    </UserProductsStackNavigator.Navigator>
  );
};
