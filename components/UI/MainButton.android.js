import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  // backgroundColor: props.style ? props.style.backgroundColor ? props.style.backgroundColor : Colors.accent : Colors.accent,
  // fontSize: props.style ? props.style.fontSize ? props.style.fontSize : 20 : 20,
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "helvetica-standard",
    textAlign: "center",
    fontSize: 20,
  },
});

export default MainButton;
