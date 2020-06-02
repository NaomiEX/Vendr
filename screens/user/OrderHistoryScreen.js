import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderHistoryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Order History Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderHistoryScreen;
