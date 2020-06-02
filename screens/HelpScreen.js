import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HelpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Help Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HelpScreen;
