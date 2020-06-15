import React from "react";
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Permission,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const verify = async () => {
  const result = await Permissions.askAsync();
};

const takeThumbnailHandler = () => {};

const ThumbnailPicker = (props) => {
  console.log(props);
  return (
    <View style={styles.touchableContainer}>
      <TouchableComponent
        useForeground={true}
        onPress={() => {
          props.thumbnail.id === "add_thumbnail"
            ? console.log("Hello")
            : console.log("World");
        }}
      >
        <View style={{ width: 88, height: 128 }}>
          <Image source={props.thumbnail.imageUrl} />
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContainer: { borderRadius: 20, overflow: "hidden" },
});

export default ThumbnailPicker;
