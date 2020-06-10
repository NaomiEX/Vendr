import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import { ShopNavigator } from "./ShopNavigator";
import { DrawerNavigator } from "./DrawerNavigator";
import { WishlistNavigator } from "./WishlistNavigator";
import { CategoriesOverviewNavigator } from "./CategoriesOverviewNavigator";

import Colors from "../../constants/Colors";

import { Ionicons, AntDesign } from "@expo/vector-icons";

const BottomTabBarNavigator = createBottomTabNavigator();

const IoniconIcon = (props) => (
  <View style={{ marginTop: 5 }}>
    <Ionicons
      name={
        Platform.OS === "android" ? `md-${props.icon}` : `ios-${props.icon}`
      }
      size={27}
      color={props.iconColor}
    />
  </View>
);

export const BottomTabNavigator = () => {
  const isDrawerActive = useSelector(
    (state) => state.activeComponents.isDrawerActive
  );

  return (
    <BottomTabBarNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "rgba(0,0,0,0.2)",
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabBarNavigator.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          tabBarIcon: (props) => {
            return <IoniconIcon icon="home" iconColor={props.color} />;
          },
          tabBarVisible: !isDrawerActive,
        }}
      />
      <BottomTabBarNavigator.Screen
        name="All Categories"
        component={CategoriesOverviewNavigator}
        options={{
          tabBarIcon: (props) => {
            return (
              <View style={{ marginTop: 5 }}>
                <AntDesign name="appstore1" size={27} color={props.color} />
              </View>
            );
          },
        }}
      />
      <BottomTabBarNavigator.Screen
        name="Wishlist"
        component={WishlistNavigator}
        options={{
          tabBarIcon: (props) => {
            return <IoniconIcon icon="heart" iconColor={props.color} />;
          },
        }}
      />
    </BottomTabBarNavigator.Navigator>
  );
};
