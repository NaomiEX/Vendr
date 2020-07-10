import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const PrimaryButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          ...styles.buttonContainer,
          width: props.style && props.style.width,
        }}
      >
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  text: {
    fontSize: 14,
    fontFamily: "helvetica-light",
    color: "white",
  },
});

export default PrimaryButton;
