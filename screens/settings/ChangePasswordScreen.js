import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import Input from "../../components/Input";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as authenticationActions from "../../store/actions/authentication";
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

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const ChangePasswordScreen = (props) => {
  const [show, setShow] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pressed, setPressed] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      oldPassword: "",
      newPassword: "",
    },
    inputValidities: {
      oldPassword: false,
      newPassword: false,
    },
    formIsValid: false,
  });

  const oldPasswordInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputType: "oldPassword",
      });
    },
    [dispatchFormState]
  );
  const newPasswordInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputType: "newPassword",
      });
    },
    [dispatchFormState]
  );

  const inputChangeHandler = (text) => {
    setConfirmNewPassword(text);
  };

  console.log("Form State: ");
  console.log(formState);

  const ChangePasswordButton = (props) => {
    return (
      <View style={styles.touchableContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <TouchableComponent
            onPress={() => {
              setPressed(true);
            }}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Change Account Password</Text>
            </View>
          </TouchableComponent>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
            setShow(true);
            setPressed(false);
            setIsLoading(false);
          },
        },
      ]);
    }
  }, [error]);

  const { formIsValid } = formState;

  const dispatch = useDispatch();

  useEffect(() => {
    changePasswordHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      setIsLoading(true);
      if (!formIsValid) {
        setError("Please enter a valid password");
      } else if (formState.inputValues.newPassword !== confirmNewPassword) {
        setError("The new passwords do not match!");
      } else {
        try {
          await dispatch(
            authenticationActions.checkPassword(
              formState.inputValues.oldPassword
            )
          );
          await dispatch(
            userProfileActions.changePassword(formState.inputValues.newPassword)
          );
          props.navigation.navigate("Settings", {
            toastText: "Password successfully changed",
          });
        } catch (err) {
          if (pressed) {
            setError(err.message);
          }
          setIsLoading(false);
          setPressed(false);
          setShow(true);
        }
      }
    };
    if (pressed) {
      changePasswordHandler();
    }
  }, [pressed]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <TitleText style={{ color: Colors.primary }}>
            Change Password
          </TitleText>
          <Divider dividerStyle={{ width: 30, height: 2, marginTop: 10 }} />
        </View>
        <View style={styles.body}>
          <EmphasisText style={{ color: Colors.inactive_grey }}>
            Old Password
          </EmphasisText>
          <Input
            style={styles.input}
            onInputChange={oldPasswordInputChangeHandler}
            type="password"
            show={show}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <EmphasisText style={{ color: Colors.inactive_grey, marginTop: 30 }}>
            New Password
          </EmphasisText>
          <Input
            style={styles.input}
            onInputChange={newPasswordInputChangeHandler}
            type="password"
            show={show}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <EmphasisText style={{ color: Colors.inactive_grey, marginTop: 30 }}>
            Confirm New Password
          </EmphasisText>
          <TextInput
            selectionColor="rgba(0,0,0,0.1)"
            underlineColorAndroid="rgba(0,0,0,0)"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.confirmNewPassword}
            value={confirmNewPassword}
            onChangeText={inputChangeHandler}
          />
          <ChangePasswordButton />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.translucent_grey,
    color: Colors.black,
    width: DeviceDimensions.width * 0.6,
  },

  body: {
    marginLeft: 20,
    marginTop: 40,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "helvetica-light",
    color: "white",
  },

  confirmNewPassword: {
    borderBottomWidth: 1.5,
    marginTop: 5,
    paddingHorizontal: 7,
    paddingBottom: 2,
    width: DeviceDimensions.width * 0.6,
    borderBottomColor: Colors.translucent_grey,
    color: Colors.black,
    fontSize: 16,
  },

  touchableContainer: {
    width: DeviceDimensions.width * 0.6,
    height: 46,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 40,
  },

  buttonContainer: {
    width: DeviceDimensions.width * 0.6,
    height: 46,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChangePasswordScreen;
