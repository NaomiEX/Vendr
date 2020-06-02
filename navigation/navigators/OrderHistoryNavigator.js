import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import OrderHistoryScreen, {
  screenOptions as orderHistoryScreenOptions,
} from "../../screens/user/OrderHistoryScreen";

const OrderHistoryStackNavigator = createStackNavigator();

export const OrderHistoryNavigator = () => {
  return (
    <OrderHistoryStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrderHistoryStackNavigator.Screen
        name="Order History"
        component={OrderHistoryScreen}
        options={orderHistoryScreenOptions}
      />
    </OrderHistoryStackNavigator.Navigator>
  );
};
