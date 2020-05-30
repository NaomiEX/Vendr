import React, { useCallback, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationNavigator } from "./ShopNavigator";

const NavigatorContainer = (props) => {
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
};

export default NavigatorContainer;
