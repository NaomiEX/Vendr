import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import MainButton from "../../components/UI/MainButton";
import BodyText from "../../components/Text/BodyText";

import * as authenticationActions from "../../store/actions/authentication";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [show, setShow] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
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
    loginHandler = async () => {
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
          authenticationActions.login(
            formState.inputValues.email,
            formState.inputValues.password,
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
      loginHandler();
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
              label="Email-address"
              keyboardType="email-address"
              onInputChange={inputChangeHandler}
              type="email"
              isSignIn
              show={show}
            />
            <Input
              label="Password"
              onInputChange={inputChangeHandler}
              type="password"
              isSignIn
              show={show}
            />
            <View style={styles.buttonViewContainer}>
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.accent} />
                ) : (
                  <MainButton
                    onPress={() => {
                      setButtonPressed(true);
                    }}
                  >
                    Login
                  </MainButton>
                )}
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
