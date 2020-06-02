import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProductsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>User Products Screen</Text>
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

export default UserProductsScreen;
