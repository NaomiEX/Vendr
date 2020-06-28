import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  Platform,
  Modal,
  Alert,
} from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import DeviceDimensions from "../../constants/DeviceDimensions";
import ImagePickerModal from "../../components/ImagePickerModal";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const BubbleProfilePicture = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(props.image);

  const verify = async (type) => {
    let result;

    if (type === "camera") {
      result = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
    } else if (type === "gallery") {
      result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "This app does not have sufficient permissions to continue",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verify("gallery");
    if (!hasPermission) {
      return;
    }
    setShowModal(false);
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!image.cancelled) {
      setProfilePicture({ uri: image.uri });
      setShowModal(false);
    }
  };

  const chooseImageHandler = async () => {
    const hasPermission = await verify("camera");
    if (!hasPermission) {
      return;
    }
    setShowModal(false);
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!image.cancelled) {
      setProfilePicture({ uri: image.uri });
      setShowModal(false);
    }
  };

  const imagePickedHandler = (imageUri) => {
    setProfilePicture({ uri: imageUri });
    setShowModal(false);
  };

  useEffect(() => {
    props.setProfilePicture(profilePicture);
  }, [profilePicture]);

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={styles.profilePicture}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={profilePicture}
          />
        </View>
        <View style={styles.editContainer}>
          <TouchableComponent
            onPress={() => {
              setShowModal(true);
            }}
          >
            <View style={styles.edit}>
              <Image source={require("../../assets/icons/edit.png")} />
            </View>
          </TouchableComponent>
        </View>
      </View>
      {showModal && (
        <ImagePickerModal
          takeImageHandler={takeImageHandler}
          chooseImageHandler={chooseImageHandler}
          onImagePicked={imagePickedHandler}
          dismiss={() => {
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: DeviceDimensions.width / 3.703,
    height: DeviceDimensions.width / 3.703,
    borderRadius: DeviceDimensions.width / 3.703 / 2,
    overflow: "hidden",
    marginTop: 35,
    marginLeft: DeviceDimensions.width / 26.18,
  },

  editContainer: {
    width: DeviceDimensions.width / 8.22,
    height: DeviceDimensions.width / 8.22,
    borderRadius: DeviceDimensions.width / 8.22 / 2,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 5,
    marginLeft: -DeviceDimensions.width / 11.22,
  },

  edit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BubbleProfilePicture;
