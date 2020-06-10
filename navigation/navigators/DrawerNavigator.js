import React, { useEffect } from "react";
import {
  Platform,
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import BubbleIcon from "../../components/UI/BubbleIcon";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import CustomDrawerItem from "./DrawerContent";
import BodyText from "../../components/Text/BodyText";

import { ShopNavigator } from "./ShopNavigator";
import { AccountNavigator } from "./AccountNavigator";
import { OrderHistoryNavigator } from "./OrderHistoryNavigator";
import { SettingsNavigator } from "./SettingsNavigator";
import { HelpNavigator } from "./HelpNavigator";
import { ContactUsNavigator } from "./ContactUsNavigator";
import { UserProductsNavigator } from "./UserProductsNavigator";

import * as authenticationActions from "../../store/actions/authentication";
import * as userProfileActions from "../../store/actions/userProfile";

const ShopDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  const dispatch = useDispatch();
  dispatch(userProfileActions.getProfile());
  const username = useSelector((state) => state.userProfile.username);
  const email = useSelector((state) => state.userProfile.email);
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

  let ViewWrapper = View;
  if (DeviceDimensions.height < 722.27) {
    ViewWrapper = ScrollView;
  }

  return (
    <ShopDrawerNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{
        width: DeviceDimensions.width / 1.3,
      }}
      drawerContent={(props) => {
        return (
          <ViewWrapper>
            {/* profile section */}
            <View style={styles.profileSectionContainer}>
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={require("../../assets/Drawer_Background.png")}
              >
                <View style={styles.bubbleIconContainer}>
                  <BubbleIcon profilePicture={imageUrl} />
                </View>
                <View style={styles.profileDetailsContainer}>
                  <CategoryHeaderText style={{ color: "white" }}>
                    {username}
                  </CategoryHeaderText>
                  <View style={styles.profileEmailContainer}>
                    <View style={{ marginRight: 10 }}>
                      <Image source={require("../../assets/icons/mail.png")} />
                    </View>
                    <BodyText
                      style={{
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {email}
                    </BodyText>
                  </View>
                </View>
              </ImageBackground>
            </View>
            {/* Main drawer section */}
            <CustomDrawerItem
              {...props}
              title="Profile"
              icon="person"
              screen="Profile"
              iconPack={Ionicons}
            />
            <CustomDrawerItem
              {...props}
              title="Home"
              icon="home"
              screen="Home"
              iconPack={Ionicons}
            />
            <CustomDrawerItem
              {...props}
              title="Your Products"
              icon="boxes"
              screen="Your Products"
              iconPack={FontAwesome5}
            />
            <CustomDrawerItem
              {...props}
              title="Order History"
              icon="scroll"
              screen="Order History"
              iconPack={FontAwesome5}
            />
            <CustomDrawerItem
              {...props}
              title="Settings"
              icon="settings"
              screen="Settings"
              iconPack={Ionicons}
            />
            {/* Line separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separator}></View>
            </View>
            {/* The second half of the drawer contents */}
            <CustomDrawerItem
              {...props}
              title="Help"
              icon="help-circle"
              screen="Help"
              iconPack={Ionicons}
            />
            <CustomDrawerItem
              {...props}
              title="Contact Us"
              icon="chatboxes"
              screen="Contact Us"
              iconPack={Ionicons}
            />
            <DrawerItem
              style={{ marginTop: 2 }}
              icon={() => {
                return (
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-log-out" : "ios-log-out"
                    }
                    size={27}
                    color={Colors.inactive_grey}
                  />
                );
              }}
              label={() => (
                <Text
                  style={{
                    color: "black",
                    fontFamily: "helvetica-standard",
                    fontSize: 16,
                  }}
                >
                  Sign Out
                </Text>
              )}
              onPress={() => {
                dispatch(authenticationActions.logout());
              }}
            />
            {/* <Button
              title="Get user data"
              color={"#43cebe"}
              onPress={() => {
                dispatch(userProfileActions.getProfile());
              }}
              />
              <Button
              title="Change password"
              color={"#478feb"}
              onPress={() => {
                dispatch(authenticationActions.resetPassword());
              }}
              />
              <Button
              title="Delete account"
              color={Colors.primary}
              onPress={() => {
                dispatch(authenticationActions.deleteAccount());
              }}
            /> */}
          </ViewWrapper>
        );
      }}
    >
      <ShopDrawerNavigator.Screen name="Profile" component={AccountNavigator} />
      <ShopDrawerNavigator.Screen name="Home" component={ShopNavigator} />
      <ShopDrawerNavigator.Screen
        name="Your Products"
        component={UserProductsNavigator}
      />
      <ShopDrawerNavigator.Screen
        name="Order History"
        component={OrderHistoryNavigator}
      />
      <ShopDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
      />
      <ShopDrawerNavigator.Screen name="Help" component={HelpNavigator} />
      <ShopDrawerNavigator.Screen
        name="Contact Us"
        component={ContactUsNavigator}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    width: "100%",
    height: DeviceDimensions.height / 4.149,
    marginBottom: 3,
  },

  bubbleIconContainer: {
    marginTop: DeviceDimensions.height / 21.69,
    marginLeft: DeviceDimensions.width / 15.71,
  },

  profileDetailsContainer: {
    flex: 1,
    marginLeft: 25,
    marginBottom: 20,
    justifyContent: "flex-end",
  },

  profileEmailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -2,
  },

  separatorContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 18,
  },

  separator: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: DeviceDimensions.width / 1.389,
    height: DeviceDimensions.height / 379.64,
  },
});
