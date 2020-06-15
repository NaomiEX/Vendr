import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Alert,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Modal,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Keyboard,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import MainButton from "../components/UI/MainButton";
import Input from "./Input";
import EmphasisText from "./Text/EmphasisText";
import ImagePickerModal from "../components/ImagePickerModal";

import Colors from "../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    return { ...state, url: action.url, urlValidity: action.validity };
  }
};

const ProductImagePicker = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [cancelPressed, setCancelPressed] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    url: "",
    urlValidity: false,
  });

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
      aspect: props.thumbnail ? [11, 16] : [10, 9],
      quality: 0.5,
    });

    if (!image.cancelled) {
      props.image
        ? props.onImagePicked(image.uri)
        : props.onThumbnailPicked(image.uri);
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
      aspect: props.thumbnail ? [11, 16] : [10, 9],
      quality: 0.5,
    });

    if (!image.cancelled) {
      props.image
        ? props.onImagePicked(image.uri)
        : props.onThumbnailPicked(image.uri);
    }
  };

  const tappedPickedImageHandler = () => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          props.imageUri
            ? props.deleteImageHandler(props.imageUri, props.thumbnailUri)
            : props.deleteThumbnailHandler();
        },
      },
    ]);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        url: inputValue,
        validity: inputValidity,
      });
    },
    [dispatchFormState]
  );

  const { validity, url } = formState;

  useEffect(() => {
    if (confirmPressed) {
      Keyboard.dismiss();
      if (validity) {
        props.onImagePicked(url);
        setShowUrlModal(false);
        setShowModal(false);
      } else {
        setConfirmPressed(false);
        setShow(true);
      }
    }
  }, [validity, confirmPressed]);

  let width = 120;
  let height = 108;
  if (props.thumbnail || props.thumbnailUri) {
    width = 110;
    height = 160;
  }

  let source = props.image;
  if (props.imageUri) {
    source = { uri: props.imageUri };
  } else if (props.thumbnail) {
    source = props.thumbnail;
  } else if (props.thumbnailUri) {
    source = { uri: props.thumbnailUri };
  }

  let onPress = () => {
    setShowModal(true);
  };

  if (props.imageUri || props.thumbnailUri) {
    onPress = tappedPickedImageHandler;
  }

  return (
    <View>
      <TouchableComponent useForeground={true} onPress={onPress}>
        <View
          style={{
            width: width,
            height: height,
            borderRadius: (props.thumbnail || props.thumbnailUri) && 20,
            overflow: "hidden",
          }}
        >
          <Image style={{ width: width, height: height }} source={source} />
        </View>
      </TouchableComponent>
      {showModal && (
        <Modal animationType="fade" transparent visible={showModal}>
          <View style={styles.modalBackground}>
            <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
              <Image
                style={styles.modalImage}
                source={require("../assets/Modal_Image.png")}
              />
              <ImageBackground
                style={{ width: 311, height: 333 }}
                source={require("../assets/Modal_Circle_Cut.png")}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <Image
                    style={styles.cross}
                    source={require("../assets/icons/gray_cross.png")}
                  />
                </TouchableOpacity>
                <View style={styles.modalContentContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      paddingHorizontal: 40,
                      marginTop: 53,
                      marginBottom: 15,
                      textAlign: "center",
                    }}
                  >
                    How would you like to upload your picture?
                  </Text>
                  <MainButton style={styles.button} onPress={takeImageHandler}>
                    <Text style={styles.buttonText}>Take a Picture</Text>
                  </MainButton>
                  <MainButton
                    style={styles.button}
                    onPress={chooseImageHandler}
                  >
                    <Text style={styles.buttonText}>Open Gallery</Text>
                  </MainButton>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setShowModal(false);
                      setShowUrlModal(true);
                    }}
                  >
                    <Text style={styles.imageUrlText}>
                      I would rather upload the image url
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </Modal>
      )}
      {showUrlModal && (
        <Modal animationType="fade" transparent visible={showUrlModal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalBackground}>
              <ImageBackground
                style={{ width: 311, height: 154 }}
                source={require("../assets/Modal_Image_Url.png")}
              >
                <Text
                  style={{
                    ...styles.modalText,
                    marginTop: 30,
                    marginLeft: 20,
                    marginBottom: 10,
                  }}
                >
                  Please enter the image url
                </Text>
                <Input
                  style={{
                    borderBottomColor: Colors.inactive_grey,
                    color: Colors.black,
                    marginHorizontal: 20,
                    fontSize: 14,
                  }}
                  type="url"
                  show={show}
                  onInputChange={inputChangeHandler}
                />
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      setShow(false);
                      setShowUrlModal(false);
                      setShowModal(true);
                    }}
                  >
                    <EmphasisText
                      style={{ ...styles.actionButton, color: Colors.primary }}
                    >
                      Cancel
                    </EmphasisText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      if (formState.urlValidity) {
                        setShow(false);
                        setShowUrlModal(false);
                        setShowModal(false);
                        props.thumbnail
                          ? props.onThumbnailPicked(url)
                          : props.onImagePicked(url);
                      } else {
                        setShow(true);
                      }
                    }}
                  >
                    <EmphasisText
                      style={{
                        ...styles.actionButton,
                        color: Colors.accent,
                      }}
                    >
                      Confirm
                    </EmphasisText>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  modalImage: {
    width: 89,
    height: 89,
    position: "absolute",
    top: -46,
    left: 111,
  },

  cross: {
    marginTop: 20,
    marginLeft: 20,
  },

  modalContentContainer: {
    alignItems: "center",
  },

  modalText: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    color: Colors.black,
    letterSpacing: 1,
  },

  button: {
    backgroundColor: Colors.primary,
    width: 271,
    marginTop: 15,
  },

  buttonText: {
    fontSize: 16,
  },

  imageUrlText: {
    color: Colors.accent,
    textDecorationLine: "underline",
    marginTop: 20,
  },

  actionButtonsContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 15,
  },

  actionButton: {
    marginRight: 20,
  },
});

export default ProductImagePicker;
