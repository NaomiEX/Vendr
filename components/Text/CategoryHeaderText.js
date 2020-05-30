import React from "react";
import { Text, StyleSheet } from "react-native";

const HeaderText = (props) => {
  return (
    <Text {...props} style={{ ...props.style, ...styles.text }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "helvetica-bold",
  },
});

export default HeaderText;
