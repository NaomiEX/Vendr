import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import DeviceDimensions from "../../constants/DeviceDimensions";

const SettingItem = (props) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.itemContainer}>
        <View style={styles.identifierContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 33, height: 33 }}
              source={props.imageIconUrl}
            />
          </View>
          <Text style={styles.itemTitle}>{props.itemTitle}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            source={require("../../assets/icons/Settings_Next_Arrow.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: DeviceDimensions.width - 20,
    height: 50,
  },

  identifierContainer: {
    flexDirection: "row",
    marginLeft: DeviceDimensions.width / 39.27,
  },

  imageContainer: {
    marginRight: DeviceDimensions.width / 19.637,
  },

  itemTitle: {
    fontFamily: "helvetica-standard",
    fontSize: 20,
    letterSpacing: 0.8,
  },

  arrowContainer: {
    marginRight: DeviceDimensions.width / 39.27,
  },
});

export default SettingItem;
