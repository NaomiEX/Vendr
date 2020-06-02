import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import HelpScreen, {
  screenOptions as helpScreenOptions,
} from "../../screens/HelpScreen";

const HelpStackNavigator = createStackNavigator();

export const HelpNavigator = () => {
  return (
    <HelpStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HelpStackNavigator.Screen
        name="Help"
        component={HelpScreen}
        options={helpScreenOptions}
      />
    </HelpStackNavigator.Navigator>
  );
};
