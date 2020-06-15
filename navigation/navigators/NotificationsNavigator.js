import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import NotificationsScreen from "../../screens/user/NotificationsScreen";

const NotificationsStackNavigator = createStackNavigator();

export const NotificationsNavigator = () => {
  return (
    <NotificationsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <NotificationsStackNavigator.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </NotificationsStackNavigator.Navigator>
  );
};
