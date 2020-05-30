import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return (
    <Text {...props} style={{ ...props.style, ...styles.text }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: "helvetica-standard",
  },
});

export default BodyText;
