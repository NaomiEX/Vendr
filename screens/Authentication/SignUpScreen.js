import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import MainButton from "../../components/UI/MainButton";

import * as authenticationActions from "../../store/actions/authentication";
import DeviceDimensions from "../../constants/DeviceDimensions";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const { formIsValid } = formState;

  useEffect(() => {
    signUpHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      // ensures that the loading spinner shows only once, previously it would appear, disapear twice
      // (because loginHandler runs again when setButtonPressed(false) is executed down below and useEffect runs again, as buttonPressed state changes,
      // loginHandler is executed again because formState is still valid from last time)
      if (buttonPressed) {
        setIsLoading(true);
      }
      try {
        await dispatch(
          authenticationActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password,
            formState.inputValues.username,
            formIsValid
          )
        );
      } catch (err) {
        if (buttonPressed) {
          setError(err.message);
        }
        // runs twice but since the second time setIsLoading(true) does not run, it makes no visual difference as isLoading is already false
        setIsLoading(false);
        setButtonPressed(false);
        setShow(true);
      }
    };
    if (buttonPressed) {
      signUpHandler();
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={styles.gradient}
        colors={["#43cebe", "#478feb"]}
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
          <Image source={require("../../assets/icons/back_arrow.png")} />
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
              show={show}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="Username"
              onInputChange={inputChangeHandler}
              type="username"
              show={show}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              label="Password"
              onInputChange={inputChangeHandler}
              type="password"
              show={show}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            <View style={styles.buttonViewContainer}>
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <MainButton
                    onPress={() => {
                      setButtonPressed(true);
                    }}
                  >
                    Sign up
                  </MainButton>
                )}
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
    marginLeft: DeviceDimensions.width / 41.1,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: DeviceDimensions.height / 13.54,
  },

  contentContainer: {
    marginBottom: DeviceDimensions.height / 14.62,
  },

  buttonViewContainer: {
    width: "100%",
  },

  buttonContainer: {
    marginHorizontal: DeviceDimensions.width / 3.914,
    marginTop: DeviceDimensions.height / 24.37,
  },

  textContainer: {
    alignItems: "center",
    marginTop: DeviceDimensions.height / 73.1,
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
