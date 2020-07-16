import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { DrawerNavigator } from "./DrawerNavigator";
import { WishlistNavigator } from "./WishlistNavigator";
import { CategoriesOverviewNavigator } from "./CategoriesOverviewNavigator";
import { NotificationsNavigator } from "./NotificationsNavigator";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

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
        style: {
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
          top: DeviceDimensions.height - 52,
          height: 52,
          paddingBottom: 2,
        },
      }}
      initialRouteName="Home"
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
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: (props) => {
            return (
              <View>
                <Ionicons
                  name={
                    Platform.OS == "android"
                      ? "md-notifications"
                      : "ios-notifications"
                  }
                  size={27}
                  color={props.color}
                />
                {/* <View
                  style={{
                    backgroundColor: Colors.primary,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    overflow: "hidden",
                    position: "absolute",
                    top: 3,
                    right: 0,
                  }}
                ></View> */}
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
