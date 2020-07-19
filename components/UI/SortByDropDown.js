import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SortByDropDown = (props) => {
  const renderDropDownItem = (item) => {
    return (
      <TouchableOpacity
        style={{ backgroundColor: "white" }}
        activeOpacity={0.7}
        onPress={props.onPress.bind(this, item.label)}
        key={item.id}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: 133,
        borderWidth: 1,
        borderColor: Colors.inactive_grey,
        alignItems: "center",
        paddingVertical: 2,
        backgroundColor: "white",
      }}
    >
      {props.data.map((item) => renderDropDownItem(item))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SortByDropDown;
