import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import * as activeComponentsActions from "../../store/actions/activeComponents";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Settings"));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Text
        onPress={() => {
          props.navigation.navigate("Edit Profile");
        }}
      >
        Edit User Profile
      </Text>
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default SettingsScreen;
