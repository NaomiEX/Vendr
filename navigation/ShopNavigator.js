import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LoginScreen from "../screens/Authentication/LoginScreen";
import SignUpScreen from "../screens/Authentication/SignUpScreen";

const AuthenticationStackNavigator = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
