import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrdersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Orders Screen</Text>
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

export default OrdersScreen;
