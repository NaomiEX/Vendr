import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const TitleText = (props) => {
  return (
    <Text
      style={{
        ...props.style,
        ...styles.text,
        color: props.style
          ? props.style.color
            ? props.style.color
            : Colors.black
          : Colors.black,
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "helvetica-light",
    fontSize: 20,
    letterSpacing: 1,
  },
});

export default TitleText;
