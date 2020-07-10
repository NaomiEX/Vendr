import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../../screens/settings/SettingsScreen";
import EditProfileScreen from "../../screens/settings/EditProfileScreen";
import ChangePasswordScreen from "../../screens/settings/ChangePasswordScreen";
import AddressesScreen from "../../screens/settings/AddressesScreen";
import BillingAddressScreen from "../../screens/settings/BillingAddressScreen";
import ManageCardsScreen, {
  screenOptions as manageCardsScreenOptions,
} from "../../screens/settings/ManageCardsScreen";
import EditCardScreen from "../../screens/settings/EditCardScreen";

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
      <SettingsStackNavigator.Screen
        name="Change Password"
        component={ChangePasswordScreen}
      />
      <SettingsStackNavigator.Screen
        name="Addresses"
        component={AddressesScreen}
      />
      <SettingsStackNavigator.Screen
        name="Billing Address"
        component={BillingAddressScreen}
      />
      <SettingsStackNavigator.Screen
        name="Manage Cards"
        component={ManageCardsScreen}
        options={manageCardsScreenOptions}
      />
      <SettingsStackNavigator.Screen
        name="Edit Card"
        component={EditCardScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};
