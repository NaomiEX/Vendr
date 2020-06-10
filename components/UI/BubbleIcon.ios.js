import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import DeviceDimensions from "../../constants/DeviceDimensions";

const BubbleIcon = (props) => {
  return (
    <View>
      <View style={styles.iconContainer}>
        {props.icon && (
          <View
            style={{
              ...styles.iconBackground,
              backgroundColor: props.iconBackgroundColor,
            }}
          >
            <TouchableOpacity>
              <Image source={props.icon} />
            </TouchableOpacity>
          </View>
        )}
        {props.profilePicture && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={props.profilePicture}
          />
        )}
      </View>
      {props.title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
  },

  iconBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    width: 60,
    marginTop: DeviceDimensions.height / 151.85,
    alignItems: "center",
  },

  title: {
    fontSize: 12,
    fontFamily: "helvetica-standard",
  },
});

export default BubbleIcon;
