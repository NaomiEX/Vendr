import React from "react";
import { View, StyleSheet } from "react-native";

const BasicScreen = (props) => {
  return (
    <View style={{ ...props.style, ...styles.screen }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default BasicScreen;
