import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../../screens/settings/SettingsScreen";

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};
