import React from "react";
import { View, Text, StyleSheet } from "react-native";

import BodyText from "../../components/Text/BodyText";

import Colors from "../../constants/Colors";

const Chip = (props) => {
  return (
    <View style={styles.chip}>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.translucent_grey,
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
});

export default Chip;
