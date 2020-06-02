import React from "react";
import { CardStyleInterpolators } from "@react-navigation/stack";

import Colors from "../constants/Colors";

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
