import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { CardStyleInterpolators } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

export const defaultNavOptions = {
  // headerBackground: () => (
  //   <LinearGradient
  //     style={{ flex: 1 }}
  //     colors={[Colors.secondary, Colors.primary]}
  //     start={[0, 0]}
  //     end={[1, 1]}
  //   />
  // ),
  headerBackground: () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    ></View>
  ),
  headerTitleStyle: {
    color: "white",
    // color: Colors.primary,
    // fontFamily: "helvetica-bold",
    // fontSize: 20,
    // letterSpacing: 2,
  },
  headerTitleContainerStyle: {
    marginBottom: DeviceDimensions.height / 151.85,
  },
  headerLeftContainerStyle: {
    marginLeft: DeviceDimensions.width / 39.273,
    marginBottom: DeviceDimensions.height / 151.85,
  },
  headerRightContainerStyle: {
    marginRight: DeviceDimensions.width / 39.273,
    marginBottom: DeviceDimensions.height / 151.85,
  },
  headerTitleAlign: "center",
  headerStyle: {
    height: DeviceDimensions.height / 9.86,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
