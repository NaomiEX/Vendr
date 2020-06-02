import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductDetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Product Details Screen</Text>
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

export default ProductDetailsScreen;
