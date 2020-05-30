import React, { useState, useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import validate from "validate.js";

import Colors from "../constants/Colors";
import EmphasisText from "../components/Text/EmphasisText";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        errorMessage: action.errorMessage,
        isValid: action.isValid,
      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };

    default:
      return state;
  }
};

const constraints = {
  username: {
    length: {
      minimum: 1,
      tooShort: "^Your username cannot be empty",
      maximum: 20,
      tooLong: "^Your username must not exceed 20 characters",
    },
    format: {
      pattern: "[A-Za-z0-9_.]+",
      message:
        "^Your username can only contain letters, numbers, underscore(_), and period(.)",
    },
  },
  email: {
    email: {
      message: "^Please enter a valid email-address",
    },
  },
  password: {
    length: {
      minimum: 6,
      tooShort: "^Your password must be at least 6 characters",
      maximum: 20,
      tooLong: "^Your password must not exceed 20 characters",
    },
    format: {
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
      message:
        "^Your password must contain an uppercase letter, a lowercase letter, and a digit",
    },
  },
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    errorMessage: "",
    isValid: false,
    touched: false,
  });

  const { onInputChange } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(props.type, inputState.value, inputState.isValid);
    }
  }, [onInputChange, inputState]);

  let object = {};

  let result;
  const inputChangeHandler = (text) => {
    object[props.type] = text;
    result = validate(object, constraints);
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      errorMessage: result
        ? result[props.type]
          ? result[props.type][0]
          : null
        : null,
      isValid: result ? (result[props.type] ? false : true) : true,
    });
  };

  const lostFocusHandler = (text) => {
    inputChangeHandler(text);
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <View style={styles.container}>
      <EmphasisText style={styles.label}>{props.label}</EmphasisText>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={{
            ...styles.input,
            borderColor:
              !inputState.isValid && inputState.touched
                ? props.isSignIn
                  ? Colors.accent
                  : "white"
                : "white",
          }}
          onChangeText={inputChangeHandler}
          value={inputState.value}
          onBlur={lostFocusHandler.bind(this, inputState.value)}
        />
        {!inputState.isValid && inputState.touched && (
          <Text
            style={{
              color: props.isSignIn ? Colors.accent : "red",
              textAlign: "left",
            }}
          >
            {inputState.errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: Dimensions.get("window").width / 10.275,
  },

  input: {
    borderWidth: 1,
    height: 30,
    paddingHorizontal: 10,
    color: "white",
  },

  inputContainer: {
    marginHorizontal: Dimensions.get("window").width / 10.275,
  },
});

export default Input;
