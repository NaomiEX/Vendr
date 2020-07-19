import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
  RefreshControl,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import BubbleIcon from "../../components/UI/BubbleIcon";
import Tab from "../../components/Tab";
import BodyText from "../../components/Text/BodyText";
import SkeletonAccountScreen from "../../components/Skeletons/SkeletonAccountScreen";

import * as userProfileActions from "../../store/actions/userProfile";
import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as ordersActions from "../../store/actions/orders";
import * as productDiscussionActions from "../../store/actions/productDiscussion";
import * as ratingsActions from "../../store/actions/ratings";
import * as productsActions from "../../store/actions/products";
import * as wishlistActivityActions from "../../store/actions/wishlistActivity";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const AccountScreen = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // console.log("Account Screen render");

  const dispatch = useDispatch();
  // get the most up-to-date data
  const token = useSelector((state) => state.authentication.token);
  const username = " " + useSelector((state) => state.userProfile.username);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      dispatch(activeComponentsActions.updateActiveScreen("Profile", "top"));
      await dispatch(userProfileActions.getProfile(token));
      await dispatch(userProfileActions.getProfileDetails());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      // setIsLoading(true);
      await dispatch(ordersActions.getAllOrders());
      await dispatch(productDiscussionActions.getAllProductDiscussion());
      await dispatch(ratingsActions.getRatingInfo());
      await dispatch(productsActions.fetchProducts());
      await dispatch(ordersActions.getOrders());
      await dispatch(wishlistActivityActions.fetchWishlistActivity());
      setIsLoading(false);
    };

    getData();
  }, [dispatch, refreshing]);

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

  const bio = useSelector((state) => state.userProfile.bio);
  const fullName = useSelector((state) => state.userProfile.fullName);

  // console.log("BIO");
  // console.log(bio);
  // console.log("FULL NAME");
  // console.log(fullName);

  const navigateToEditProduct = () => {
    console.log("HELLO");
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  if (isLoading) {
    return <SkeletonAccountScreen />;
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 140 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.greetingsContainer}>
          <Text style={styles.greeting}>
            Hi,
            <Text
              style={{
                ...styles.greeting,
                color: activeIndex === 0 ? Colors.primary : "#4DD599",
              }}
            >
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
        <View style={styles.personalInfo}>
          <Text style={styles.fullName}>{fullName}</Text>
          <BodyText
            style={{
              color: Colors.inactive_grey,
              textAlign: "right",
              width: DeviceDimensions.width * 0.6,
            }}
          >
            {bio}
          </BodyText>
        </View>
        <Tab
          changeIndex={(index) => {
            setActiveIndex(index);
          }}
          account
          title={["Buyer", "Seller"]}
          onTap={navigateToEditProduct}
          navigation={props.navigation}
        />
      </ScrollView>
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
  screen: { backgroundColor: "white" },

  greetingsContainer: {
    marginBottom: 20,
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

  personalInfo: {
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 30,
  },

  fullName: {
    fontFamily: "helvetica-light",
    fontSize: 14,
    color: Colors.black,
    letterSpacing: 1,
  },
});

export default AccountScreen;
