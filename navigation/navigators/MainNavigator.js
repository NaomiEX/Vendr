import React from "react";
import { Platform, View, SafeAreaView, Button } from "react-native";
import { useDispatch } from "react-redux";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

import { ShopNavigator } from "./ShopNavigator";

import AccountScreen from "../../screens/user/AccountScreen";
import UserProductsScreen from "../../screens/user/UserProductsScreen";
import OrderHistoryScreen from "../../screens/user/OrderHistoryScreen";
import SettingsScreen from "../../screens/user/Settings";
import HelpScreen from "../../screens/HelpScreen";
import ContactUs from "../../screens/ContactUsScreen";

import * as authenticationActions from "../../store/actions/authentication";

const ShopDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerStyle={{
        backgroundColor: Colors.primary,
        width: 180,
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
    </ShopDrawerNavigator.Navigator>
  );
};
