import React from "react";
import { Dimensions } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

import SearchBar from "../components/SearchBar";

import Colors from "../constants/Colors";

const deviceHeight = Dimensions.get("window").height;

export const defaultNavOptions = {
  headerTitle: () => <SearchBar />,
  headerStyle: {
    height: deviceHeight / 10.847,
  },
  headerTitleContainerStyle: {
    marginVertical: 10,
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
    marginVertical: 10,
  },
  headerRightContainerStyle: {
    marginRight: 10,
    marginVertical: 10,
  },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
