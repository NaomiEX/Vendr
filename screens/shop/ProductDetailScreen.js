import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Product Detail Screen</Text>
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

export default ProductDetailScreen;
