import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TouchableOpacity,
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

const SignUpScreen = (props) => {
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
        colors={["#01E1BD", "#00CFD7"]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <TouchableOpacity
          style={styles.arrowContainer}
          activeOpacity={0.6}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require("../../assets/back_arrow.png")} />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.bodyContainer}
          enabled
          keyboardVerticalOffset={-450}
        >
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/Logo.png")} />
          </View>
          <View style={styles.contentContainer}>
            <Input
              label="Email-address"
              keyboardType="email-address"
              onInputChange={inputChangeHandler}
              type="email"
            />
            <Input
              label="Username"
              onInputChange={inputChangeHandler}
              type="username"
            />
            <Input
              label="Password"
              onInputChange={inputChangeHandler}
              type="password"
            />
            <View style={styles.buttonViewContainer}>
              <View style={styles.buttonContainer}>
                <MainButton onPress={Keyboard.dismiss}>Sign up</MainButton>
              </View>
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

  arrowContainer: {
    marginTop: 30,
    marginLeft: Dimensions.get("window").width / 41.1,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: Dimensions.get("window").height / 13.54,
  },

  contentContainer: {
    marginBottom: Dimensions.get("window").height / 14.62,
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

export default SignUpScreen;
