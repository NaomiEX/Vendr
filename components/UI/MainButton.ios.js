import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "helvetica-standard",
    fontSize: 20,
  },
});

export default MainButton;
