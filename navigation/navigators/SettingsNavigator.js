import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../../screens/settings/SettingsScreen";
import EditProfileScreen from "../../screens/settings/EditProfileScreen";

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <SettingsStackNavigator.Screen
        name="Edit Profile"
        component={EditProfileScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};
