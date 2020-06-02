import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationNavigator, MainNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

const NavigatorContainer = (props) => {
  const isAuthenticated = useSelector((state) => !!state.authentication.token);
  const didTryAutoLogin = useSelector(
    (state) => state.authentication.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuthenticated && <MainNavigator />}
      {!isAuthenticated && didTryAutoLogin && <AuthenticationNavigator />}
      {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default NavigatorContainer;
