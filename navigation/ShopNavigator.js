import React from "react";
import { Platform, View, SafeAreaView, Button } from "react-native";
import { useDispatch } from "react-redux";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import LoginScreen from "../screens/authentication/LoginScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/shop/HomeScreen";
import CartScreen from "../screens/shop/CartScreen";

import * as authenticationActions from "../store/actions/authentication";

const AuthenticationStackNavigator = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthenticationStackNavigator.Screen
        name="Login"
        component={LoginScreen}
      />
      <AuthenticationStackNavigator.Screen
        name="Sign up"
        component={SignUpScreen}
      />
    </AuthenticationStackNavigator.Navigator>
  );
};

const ShopStackNavigator = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ShopStackNavigator.Navigator>
      <ShopStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <ShopStackNavigator.Screen name="Cart" component={CartScreen} />
    </ShopStackNavigator.Navigator>
  );
};

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
