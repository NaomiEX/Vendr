import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";

import * as activeComponentsActions from "../../store/actions/activeComponents";

const OrderHistoryScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(
        activeComponentsActions.updateActiveScreen("Order History", "top")
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Screen>
      <Text>Order History Screen</Text>
    </Screen>
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

const styles = StyleSheet.create({});

export default OrderHistoryScreen;
