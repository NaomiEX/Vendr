import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CartScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Cart Screen</Text>
      <Button
        title="Go back"
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartScreen;
