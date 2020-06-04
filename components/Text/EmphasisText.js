import React from "react";
import { Text, StyleSheet } from "react-native";

const EmphasisText = (props) => {
  return (
    <Text {...props} style={{ ...props.style, ...styles.text }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "helvetica-standard",
    color: "white",
  },
});

export default EmphasisText;
