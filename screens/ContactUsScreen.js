import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";

import * as activeComponentsActions from "../store/actions/activeComponents";

const ContactUsScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Contact Us"));
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.screen}>
      <Text>Contact Us Screen</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ContactUsScreen;
