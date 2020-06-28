import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
} from "react-native";

import BodyText from "../../components/Text/BodyText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

let TouchableComponent = TouchableOpacity;

if (Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const BubbleIcon = (props) => {
  const [isLoading, setIsLoading] = useState(
    props.profilePicture ? true : false
  );

  return (
    <View>
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: props.iconBackgroundColor,
          width: props.width ? props.width : props.icon ? 60 : 65,
          height: props.height ? props.height : props.icon ? 60 : 65,
          borderRadius: props.borderRadius
            ? props.borderRadius
            : props.icon
            ? 30
            : 32.5,
          elevation: props.icon
            ? props.iconStyle
              ? props.iconStyle.elevation
                ? props.iconStyle.elevation
                : 2
              : 2
            : 2,
        }}
      >
        {props.icon && (
          <TouchableComponent onPress={props.onClick}>
            <View style={styles.iconBackground}>
              <Image
                style={
                  props.iconStyle && {
                    width: props.iconStyle.width,
                    height: props.iconStyle.height,
                  }
                }
                source={props.icon}
              />
            </View>
          </TouchableComponent>
        )}
        {props.profilePicture && (
          <TouchableComponent
            useForeground={props.onClickEdit ? true : false}
            onPress={props.onClickEdit}
          >
            <View>
              {isLoading && (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: Colors.translucent_grey,
                    alignItems: "center",
                    paddingTop: 15,
                  }}
                >
                  <ActivityIndicator size="small" color={Colors.primary} />
                </View>
              )}
              <Image
                onLoad={() => {
                  setIsLoading(false);
                }}
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
