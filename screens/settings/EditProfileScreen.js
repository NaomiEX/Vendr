import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as firebase from "firebase";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { v4 as uuidv4 } from "uuid";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import BubbleProfilePicture from "../../components/UI/BubbleProfilePicture";
import Input from "../../components/Input";
import EmphasisText from "../../components/Text/EmphasisText";
import BodyText from "../../components/Text/BodyText";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

import * as userProfileActions from "../../store/actions/userProfile";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputType]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
};

const EditProfileScreen = (props) => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [show, setShow] = useState(false);
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState("");

  const userData = useSelector((state) => state.userProfile);
  // console.log("EDIT PROFILE SCREEN USER DATA");
  // console.log(userData);

  useEffect(() => {
    userData.bio && setBio(userData.bio);
    userData.fullName && setFullName(userData.fullName);
  }, [userData]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
    },
    inputValidities: {
      username: true,
      email: true,
    },
    formIsValid: true,
  });

  let imageUrl;

  if (userData.profilePicture === "") {
    imageUrl = require("../../assets/Anonymous.png");
  } else {
    imageUrl = { uri: userData.profilePicture };
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
              onPress={() => {
                setIsLoading(true);
                setButtonPressed(true);
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, [buttonPressed, isLoading]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
            setButtonPressed(false);
            setIsLoading(false);
          },
        },
      ]);
      setShow(true);
    }
  }, [error]);

  const { username, email } = formState.inputValues;
  const { formIsValid } = formState;

  const dispatch = useDispatch();

  useEffect(() => {
    const editProfileHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      if (!formIsValid) {
        for (let index in formState.inputValidities) {
          if (!formState.inputValidities[index]) {
            setError(`Please select a valid ${index}`);
            break;
          }
        }
      } else {
        // console.log(profilePicture);
        let profilePictureUrl;
        const uploadProfilePicture = async (uri) => {
          const filename = `${uuidv4()}.jpg`;
          let ref = firebase
            .storage()
            .ref()
            .child(`images/profile_pictures/` + filename);
          const response = await fetch(uri);
          const blob = await response.blob();
          await ref.put(blob);
          await ref.getDownloadURL().then((url) => (profilePictureUrl = url));
        };

        const uploadPic = async () => {
          if (profilePicture.uri) {
            if (profilePicture.uri.startsWith("http")) {
              profilePictureUrl = profilePicture.uri;
            } else {
              await uploadProfilePicture(profilePicture.uri);
            }
          }
        };

        const dispatchActions = async () => {
          await uploadPic();
          // console.log("PROFILE PICTURE URL");
          // console.log(profilePictureUrl);
          let emailError = false;
          try {
            await dispatch(userProfileActions.changeEmail(email));
          } catch (err) {
            // console.log("THE ERROR HAS BEEN CAUGHT BY EDIT PROFILE SCREEN");
            // console.log(err.message);
            if (err.message === "This email has already been taken") {
              setError("This email already exists");
              emailError = true;
            }
          }
          if (emailError === false) {
            await dispatch(
              userProfileActions.updateProfile(
                username,
                profilePicture.uri ? profilePictureUrl : "",
                ""
              )
            );
            await dispatch(
              userProfileActions.editProfile(
                email,
                profilePicture.uri ? profilePictureUrl : "",
                username,
                fullName,
                bio
              )
            );
            props.navigation.navigate("Account");
          }
        };

        dispatchActions();
      }
    };
    if (buttonPressed) {
      editProfileHandler();
    }
  }, [formIsValid, buttonPressed]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputType: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  // console.log("EDIT PROFILE SCREEN PROFILE PICTURE:");
  // console.log(profilePicture);
  // console.log("EDIT PROFILE SCREEN FULL NAME:");
  // console.log(fullName);
  // console.log("EDIT PROFILE SCREEN BIO:");
  // console.log(bio);

  // console.log("EDIT PROFILE SCREEN FORM STATE:");
  // console.log(formState);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: "white" }}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        enabled
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View>
          <View style={{ alignItems: "center" }}>
            <TitleText style={{ color: Colors.primary, marginBottom: 5 }}>
              Profile
            </TitleText>
            <Divider dividerStyle={{ width: 20, height: 2 }} />
            <BubbleProfilePicture
              image={imageUrl}
              setProfilePicture={(imageUrl) => {
                setProfilePicture(imageUrl);
              }}
            />
          </View>
          <View style={{ marginTop: 30, marginHorizontal: 50 }}>
            <EmphasisText style={styles.header}>Username</EmphasisText>
            <Input
              style={styles.input}
              onInputChange={inputChangeHandler}
              onFocus={() => {
                setKeyboardVerticalOffset(-100);
              }}
              type="username"
              show={show}
              autoCapitalize="none"
              autoCorrect={false}
              initialValue={userData.username}
            />
            <EmphasisText style={styles.header}>Full Name</EmphasisText>
            <TextInput
              style={styles.optionalInput}
              value={fullName}
              onFocus={() => {
                setKeyboardVerticalOffset(-50);
              }}
              onChangeText={(input) => {
                setFullName(input);
              }}
            />
            <EmphasisText style={styles.header}>Email-Address</EmphasisText>
            <Input
              style={{ ...styles.input }}
              keyboardType="email-address"
              onInputChange={inputChangeHandler}
              onFocus={() => {
                setKeyboardVerticalOffset(50);
              }}
              type="email"
              show={show}
              autoCapitalize="none"
              autoCorrect={false}
              initialValue={userData.email}
            />
            <EmphasisText style={styles.header}>Bio</EmphasisText>
            <BodyText style={{ color: Colors.inactive_grey }}>
              Talk about who you are, what you like, or your current mood!
            </BodyText>
            <TextInput
              value={bio}
              onFocus={() => {
                setKeyboardVerticalOffset(80);
              }}
              multiline
              style={styles.bioContainer}
              onChangeText={(input) => {
                setBio(input);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: { color: "rgba(0,0,0,0.6)", marginTop: 20 },

  input: {
    borderBottomColor: Colors.translucent_grey,
    color: Colors.black,
  },

  optionalInput: {
    borderBottomColor: Colors.translucent_grey,
    borderBottomWidth: 1.5,
    marginTop: 5,
    paddingHorizontal: 7,
    paddingBottom: 2,
    color: Colors.black,
    fontSize: 16,
  },

  bioContainer: {
    borderColor: Colors.translucent_grey,
    borderWidth: 1.5,
    marginTop: 5,
    paddingHorizontal: 7,
    paddingBottom: 2,
    textAlignVertical: "top",
    paddingTop: 5,
    height: 80,
    color: Colors.black,
    fontSize: 12,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
