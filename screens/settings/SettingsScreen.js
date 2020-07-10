import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import SettingItem from "../../components/UI/SettingItem";
import Colors from "../../constants/Colors";
import TitleText from "../../components/Text/TitleText";

import * as activeComponentsActions from "../../store/actions/activeComponents";

const SettingsScreen = (props) => {
  const [transactions, setTransactions] = useState(false);
  const [productDiscussion, setProductDiscussion] = useState(false);
  const [wishlistChanges, setWishlistChanges] = useState(false);
  const [sales, setSales] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Settings", "top"));
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 60, paddingTop: 10 }}
    >
      {/* <Text
        onPress={() => {
          props.navigation.navigate("Edit Profile");
        }}
      >
        Edit User Profile
      </Text> */}
      <View style={{ marginBottom: 10 }}>
        <TitleText style={styles.headerText}>Account</TitleText>
      </View>

      <SettingItem
        imageIconUrl={require("../../assets/icons/edit_profile.png")}
        itemTitle="Edit Profile"
        navigation={props.navigation}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/change_password.png")}
        itemTitle="Change Password"
        navigation={props.navigation}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/addresses.png")}
        itemTitle="Addresses"
        navigation={props.navigation}
      />

      <View style={styles.headerTextContainer}>
        <TitleText style={styles.headerText}>Payment</TitleText>
      </View>

      <SettingItem
        imageIconUrl={require("../../assets/icons/billing_addresses.png")}
        itemTitle="Billing Address"
        navigation={props.navigation}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/manage_cards.png")}
        itemTitle="Manage Cards"
        navigation={props.navigation}
      />

      <View style={styles.headerTextContainer}>
        <TitleText style={styles.headerText}>Notifications</TitleText>
      </View>

      <SettingItem
        imageIconUrl={require("../../assets/icons/transactions.png")}
        itemTitle="Transactions"
        switchValue={transactions}
        onSwitchChange={(newValue) => {
          setTransactions(newValue);
        }}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/product_discussion.png")}
        itemTitle="Product Discussion"
        switchValue={productDiscussion}
        onSwitchChange={(newValue) => {
          setProductDiscussion(newValue);
        }}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/wishlist_changes.png")}
        itemTitle="Wishlist Changes"
        switchValue={wishlistChanges}
        onSwitchChange={(newValue) => {
          setWishlistChanges(newValue);
        }}
      />
      <SettingItem
        imageIconUrl={require("../../assets/icons/sales5.png")}
        itemTitle="Sales"
        switchValue={sales}
        onSwitchChange={(newValue) => {
          setSales(newValue);
        }}
      />
    </ScrollView>
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  headerTextContainer: {
    marginTop: 30,
    marginBottom: 10,
  },

  headerText: {
    marginLeft: 20,
    color: Colors.primary,
  },
});

export default SettingsScreen;
