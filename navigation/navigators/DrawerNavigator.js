import React from "react";
import { Platform, View, SafeAreaView, Button, Settings } from "react-native";
import { useDispatch } from "react-redux";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

import { ShopNavigator } from "./ShopNavigator";
import { AccountNavigator } from "./AccountNavigator";
import { OrderHistoryNavigator } from "./OrderHistoryNavigator";
import { SettingsNavigator } from "./SettingsNavigator";
import { HelpNavigator } from "./HelpNavigator";
import { ContactUsNavigator } from "./ContactUsNavigator";

import * as authenticationActions from "../../store/actions/authentication";

const ShopDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      initialRouteName="Shop"
      drawerStyle={{
        backgroundColor: Colors.primary,
        width: 240,
      }}
      drawerContent={(props) => {
        return (
          <View>
            <SafeAreaView
              style={{ paddingTop: 15 }}
              forceInset={{ top: "always", horizontal: "never" }}
            >
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.accent}
                onPress={() => {
                  dispatch(authenticationActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: Colors.inactive_grey,
        labelStyle: {
          fontSize: 16,
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Home"
        component={ShopNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Order"
        component={OrderHistoryNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Help"
        component={HelpNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Contact us"
        component={ContactUsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={24}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
