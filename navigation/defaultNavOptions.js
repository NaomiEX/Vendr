import React from "react";
import { Dimensions } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

import Colors from "../constants/Colors";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const defaultNavOptions = {
  headerTitleContainerStyle: {
    marginBottom: deviceHeight / 151.85,
  },
  headerLeftContainerStyle: {
    marginLeft: deviceWidth / 39.273,
    marginBottom: deviceHeight / 151.85,
  },
  headerRightContainerStyle: {
    marginRight: deviceWidth / 39.273,
    marginBottom: deviceHeight / 151.85,
  },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Colors.primary,
    height: deviceHeight / 9.86,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
