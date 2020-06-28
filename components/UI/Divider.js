import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Divider = (props) => {
  return (
    <View style={props.dividerStyle}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.dividerStyle
            ? props.dividerStyle.dividerColor
              ? props.dividerStyle.dividerColor
              : Colors.translucent_grey
            : Colors.translucent_grey,
        }}
      ></View>
    </View>
  );
};

export default Divider;
