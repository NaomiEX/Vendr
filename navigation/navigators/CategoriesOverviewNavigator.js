import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import CategoriesOverviewScreen, {
  screenOptions as categoriesOverviewScreenOptions,
} from "../../screens/shop/CategoriesOverviewScreen";
import CategoryScreen, {
  screenOptions as categoryScreenOptions,
} from "../../screens/shop/CategoryScreen";

const CategoriesOverviewStackNavigator = createStackNavigator();

export const CategoriesOverviewNavigator = () => {
  return (
    <CategoriesOverviewStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <CategoriesOverviewStackNavigator.Screen
        name="Categories Overview"
        component={CategoriesOverviewScreen}
        options={categoriesOverviewScreenOptions}
      />
      <CategoriesOverviewStackNavigator.Screen
        name="Category"
        component={CategoryScreen}
        options={categoryScreenOptions}
      />
    </CategoriesOverviewStackNavigator.Navigator>
  );
};
