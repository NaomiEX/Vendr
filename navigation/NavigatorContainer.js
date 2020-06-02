import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationNavigator } from "./navigators/AuthenticationNavigator";
import { DrawerNavigator } from "./navigators/DrawerNavigator";
import StartupScreen from "../screens/StartupScreen";

const NavigatorContainer = (props) => {
  const isAuthenticated = useSelector((state) => !!state.authentication.token);
  const didTryAutoLogin = useSelector(
    (state) => state.authentication.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuthenticated && <DrawerNavigator />}
      {!isAuthenticated && didTryAutoLogin && <AuthenticationNavigator />}
      {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default NavigatorContainer;
