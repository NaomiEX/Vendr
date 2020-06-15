import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";

import EditProfileScreen from "../../screens/settings/EditProfileScreen";

import DeviceDimensions from "../../constants/DeviceDimensions";
import Colors from "../../constants/Colors";

let TouchableComponent = TouchableOpacity;

if (Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SettingItem = (props) => {
  let destination = "";
  const onTouchHandler = () => {
    if (props.onSwitchChange) {
      props.onSwitchChange(!props.switchValue);
      return;
    }

    destination = props.itemTitle;
    props.navigation.navigate(destination);
  };

  return (
    <View style={styles.touchableComponentContainer}>
      <TouchableComponent onPress={onTouchHandler}>
        <View style={styles.itemContainer}>
          <View style={styles.identifierContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 25, height: 25 }}
                source={props.imageIconUrl}
              />
            </View>
            <Text style={styles.itemTitle}>{props.itemTitle}</Text>
          </View>
          {props.onSwitchChange ? (
            <View style={styles.switch}>
              <Switch
                value={props.switchValue}
                onValueChange={props.onSwitchChange}
                thumbColor={
                  props.switchValue ? "#d42828" : Colors.inactive_grey
                }
                trackColor={{
                  false: "rgba(0,0,0,0.1)",
                  true: "rgba(212,40,40,0.3)",
                }}
              />
            </View>
          ) : (
            <View style={styles.arrowContainer}>
              <Image
                source={require("../../assets/icons/Settings_Next_Arrow.png")}
              />
            </View>
          )}
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableComponentContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: DeviceDimensions.width / 41.143,
    marginTop: 5,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: DeviceDimensions.width - 20,
    height: 60,
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
    fontSize: 16,
    letterSpacing: 0.8,
  },

  arrowContainer: {
    marginRight: DeviceDimensions.width / 39.27,
  },

  switch: {
    marginRight: DeviceDimensions.width / 78.55,
  },
});

export default SettingItem;
