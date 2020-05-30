import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import BodyText from "../../components/Text/BodyText";

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

const LoginScreen = (props) => {
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.secondary, Colors.primary]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.bodyContainer}
          enabled
          keyboardVerticalOffset={-450}
        >
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/Logo.png")} />
          </View>
          <View
            style={{
              marginBottom: Dimensions.get("window").height / 24.37,
            }}
          >
            <Input
              label="Username"
              onInputChange={inputChangeHandler}
              type="username"
              isSignIn
            />
            <Input
              label="Password"
              onInputChange={inputChangeHandler}
              type="password"
              isSignIn
            />
            <View style={styles.buttonViewContainer}>
              <View style={styles.buttonContainer}>
                <MainButton onPress={Keyboard.dismiss}>Login</MainButton>
              </View>
            </View>
            <View style={styles.textContainer}>
              <BodyText style={styles.bodyText}>
                Don't have an account yet?
              </BodyText>
              <BodyText
                style={styles.signUp}
                onPress={() => {
                  props.navigation.navigate("Sign up");
                }}
              >
                Sign up here!
              </BodyText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  bodyContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 95,
  },

  buttonViewContainer: {
    width: "100%",
  },

  buttonContainer: {
    marginHorizontal: Dimensions.get("window").width / 3.914,
    marginTop: Dimensions.get("window").height / 24.37,
  },

  textContainer: {
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 73.1,
  },

  signUp: {
    textDecorationLine: "underline",
    color: "rgba(255, 199, 0, 0.6)",
  },

  bodyText: {
    color: "rgba(255,255,255,0.6)",
  },
});

export default LoginScreen;
