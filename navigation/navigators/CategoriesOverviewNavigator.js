import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import CategoriesOverviewScreen from "../../screens/shop/CategoriesOverviewScreen";

const CategoriesOverviewStackNavigator = createStackNavigator();

export const CategoriesOverviewNavigator = () => {
  return (
    <CategoriesOverviewStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <CategoriesOverviewStackNavigator.Screen
        name="Categories Overview"
        component={CategoriesOverviewScreen}
      />
    </CategoriesOverviewStackNavigator.Navigator>
  );
};
