import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
  ToastAndroid,
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
  // console.log("Account Screen render");

  const dispatch = useDispatch();
  // get the most up-to-date data
  const token = useSelector((state) => state.authentication.token);
  const username = " " + useSelector((state) => state.userProfile.username);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Profile", "top"));
      dispatch(userProfileActions.getProfile(token));
      dispatch(userProfileActions.getProfileDetails());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const profilePictureUrl = useSelector(
    (state) => state.userProfile.profilePicture
  );

  // console.log("ACCOUNT SCREEN PROFILEPICTUREURL: " + profilePictureUrl);

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
    props.route.params &&
      ToastAndroid.showWithGravityAndOffset(
        props.route.params.toastText,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        160
      );
  });

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
