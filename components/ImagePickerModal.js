import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ImageBackground,
} from "react-native";

import Colors from "../constants/Colors";

import MainButton from "../components/UI/MainButton";
import Input from "./Input";
import EmphasisText from "./Text/EmphasisText";

const ImagePickerModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View>
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
                  <MainButton
                    style={styles.button}
                    onPress={props.takeImageHandler}
                  >
                    <Text style={styles.buttonText}>Take a Picture</Text>
                  </MainButton>
                  <MainButton
                    style={styles.button}
                    onPress={props.chooseImageHandler}
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
                  onInputChange={props.onInputChange}
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
                      if (props.formState.urlValidity) {
                        setShow(false);
                        setShowUrlModal(false);
                        setShowModal(false);
                        props.onImagePicked(url);
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

export default ImagePickerModal;
