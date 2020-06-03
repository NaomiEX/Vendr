import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Platform,
  Text,
  StatusBar,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ShopCarousel from "../../components/ShopCarousel";
import SearchBar from "../../components/SearchBar";

import * as userProfileActions from "../../store/actions/userProfile";
import Colors from "../../constants/Colors";
import { LARGE_BANNERS } from "../../data/large_banners";

const deviceHeight = Dimensions.get("window").height;

const HomeScreen = (props) => {
  console.log(Dimensions.get("window").height);
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <ShopCarousel data={LARGE_BANNERS} autoplay={false} />
      <View style={{ marginTop: 100 }}>
        <Button
          title="Get user data"
          onPress={() => {
            dispatch(userProfileActions.getProfile());
          }}
        />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTransparent: true,
    headerTitle: () => <SearchBar />,
    headerStyle: {
      height: deviceHeight / 10.847,
    },
    headerTitleContainerStyle: {
      marginTop: 10,
    },
    headerLeftContainerStyle: {
      marginLeft: 10,
      marginTop: 10,
    },
    headerRightContainerStyle: {
      marginRight: 10,
      marginTop: 10,
    },
    headerTitleAlign: "center",
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
