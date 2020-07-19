import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const HeaderText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        ...styles.text,
        color: props.style
          ? props.style.color
            ? props.style.color
            : Colors.grey
          : Colors.grey,
      }}
    ></Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "helvetica-standard",
    letterSpacing: 1,
  },
});

export default HeaderText;
