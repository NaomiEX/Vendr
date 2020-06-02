import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavOptions } from "../defaultNavOptions";

import ContactUsScreen, {
  screenOptions as contactUsOptions,
} from "../../screens/ContactUsScreen";

const ContactUsStackNavigator = createStackNavigator();

export const ContactUsNavigator = () => {
  return (
    <ContactUsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ContactUsStackNavigator.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={contactUsOptions}
      />
    </ContactUsStackNavigator.Navigator>
  );
};
