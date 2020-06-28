import React from "react";
import { Text, StyleSheet } from "react-native";

const CategoryHeaderText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        ...styles.text,
        color: props.style
          ? props.style.color
            ? props.style.color
            : "rgba(0,0,0,0.6)"
          : "rgba(0,0,0,0.6)",
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "helvetica-standard",
    letterSpacing: 0.6,
  },
});

export default CategoryHeaderText;
