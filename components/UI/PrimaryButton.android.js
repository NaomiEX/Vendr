import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

let TouchableComponent = TouchableOpacity;

if (Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const PrimaryButton = (props) => {
  return (
    <TouchableComponent onPress={props.onPress}>
      <View
        style={{
          ...styles.buttonContainer,
          width: props.width,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : Colors.primary,
          paddingHorizontal: props.paddingHorizontal
            ? props.paddingHorizontal
            : 30,
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontSize: props.fontSize ? props.fontSize : 14,
            color: props.color ? props.color : "white",
          }}
        >
          {props.text}
        </Text>
        {props.iconRight && (
          <Ionicons
            style={{ marginLeft: 20 }}
            name={props.iconName}
            size={18}
            color={props.iconColor}
          />
        )}
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
  },

  text: {
    fontFamily: "helvetica-light",
  },
});

export default PrimaryButton;
