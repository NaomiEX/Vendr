import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/authentication/LoginScreen";
import SignUpScreen from "../../screens/authentication/SignUpScreen";

import { defaultNavOptions } from "../defaultNavOptions";

const AuthenticationStackNavigator = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStackNavigator.Navigator
      screenOptions={{
        ...defaultNavOptions,
        headerShown: false,
      }}
    >
      <AuthenticationStackNavigator.Screen
        name="Login"
        component={LoginScreen}
      />
      <AuthenticationStackNavigator.Screen
        name="Sign up"
        component={SignUpScreen}
      />
    </AuthenticationStackNavigator.Navigator>
  );
};
