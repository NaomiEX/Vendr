import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import BodyText from "../../components/Text/BodyText";

import DeviceDimensions from "../../constants/DeviceDimensions";

let TouchableComponent = TouchableOpacity;

if (Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const BubbleIcon = (props) => {
  return (
    <View>
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: props.iconBackgroundColor,
          width: props.icon ? 60 : 65,
          height: props.icon ? 60 : 65,
          borderRadius: props.icon ? 30 : 32.5,
        }}
      >
        {props.icon && (
          <TouchableComponent onPress={props.onClick}>
            <View style={styles.iconBackground}>
              <Image source={props.icon} />
            </View>
          </TouchableComponent>
        )}
        {props.profilePicture && (
          <TouchableComponent
            useForeground={props.onClickEdit ? true : false}
            onPress={props.onClickEdit}
          >
            <View>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={props.profilePicture}
              />
            </View>
          </TouchableComponent>
        )}
      </View>
      {props.title && (
        <View style={styles.titleContainer}>
          <BodyText numberOfLines={1}>{props.title}</BodyText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    elevation: 5,
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
});

export default BubbleIcon;
