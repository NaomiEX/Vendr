import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const EmphasisText = (props) => {
  return (
    <Text
      {...props}
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
    fontSize: 16,
    fontFamily: "helvetica-standard",
  },
});

export default EmphasisText;
