import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import BubbleIcon from "../../components/UI/BubbleIcon";
import Tab from "../../components/Tab";

import * as userProfileActions from "../../store/actions/userProfile";
import * as activeComponentsActions from "../../store/actions/activeComponents";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

const AccountScreen = (props) => {
  console.log("Account Screen render");

  const dispatch = useDispatch();
  // get the most up-to-date data
  dispatch(userProfileActions.getProfile());
  const username = " " + useSelector((state) => state.userProfile.username);

  const profilePictureUrl = useSelector(
    (state) => state.userProfile.profilePicture
  );

  let imageUrl;
  if (profilePictureUrl !== "") {
    imageUrl = {
      uri: profilePictureUrl,
    };
  } else if (profilePictureUrl === "") {
    imageUrl = require("../../assets/Anonymous.png");
  }

  const navigateToEditProduct = () => {
    props.navigation.navigate("Edit Product");
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Profile"));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.greeting}>
          Hi,
          <Text style={{ ...styles.greeting, ...styles.username }}>
            {username}!
          </Text>
        </Text>
        <BubbleIcon
          onClickEdit={() => {
            props.navigation.navigate("Edit Profile");
          }}
          profilePicture={imageUrl}
        />
      </View>
      <Tab account title={["Buyer", "Seller"]} onTap={navigateToEditProduct} />
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

    headerTitle: "Your Account",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  greetingsContainer: {
    marginBottom: 30,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },

  greeting: {
    fontFamily: "helvetica-light",
    fontSize: 36,
    letterSpacing: 0.6,
  },

  username: {
    color: Colors.accent,
  },
});

export default AccountScreen;
