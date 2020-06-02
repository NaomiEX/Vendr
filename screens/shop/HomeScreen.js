import React, { useState } from "react";
import { View, Button, StyleSheet, Image, Platform } from "react-native";
import { useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import * as authenticationActions from "../../store/actions/authentication";
import * as userProfileActions from "../../store/actions/userProfile";
import Colors from "../../constants/Colors";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Image source={require("../../assets/large_banner/Tech_Photo.png")} />
      <Button
        title="Get user data"
        onPress={() => {
          dispatch(userProfileActions.getProfile());
        }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
