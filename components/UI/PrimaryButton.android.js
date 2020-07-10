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
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <TouchableComponent onPress={props.onPress}>
        <View
          style={{
            ...styles.buttonContainer,
            width: props.width,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontSize: props.fontSize ? props.fontSize : 14,
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
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  text: {
    fontFamily: "helvetica-light",
    color: "white",
  },
});

export default PrimaryButton;
