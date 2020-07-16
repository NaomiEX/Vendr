import React, { useState, useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import validate from "validate.js";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";
import EmphasisText from "../components/Text/EmphasisText";

const INPUT_CHANGE = "INPUT_CHANGE";
const CHANGE_VALUE_ON_BLUR = "CHANGE_VALUE_ON_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        errorMessage: action.errorMessage,
        isValid: action.isValid,
      };

    case CHANGE_VALUE_ON_BLUR:
      return {
        ...state,
        value: action.value,
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
    length: {
      minimum: 1,
      tooShort: "^Your email-address cannot be empty",
    },
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

  title: {
    length: {
      minimum: 5,
      tooShort: "^Your title must be at least 5 characters",
      maximum: 100,
      tooLong: "^Your title must not exceed 100 characters",
    },
  },

  description: {
    length: {
      minimum: 10,
      tooShort: "^Your description must be at least 10 characters",
      maximum: 1000,
      tooLong: "^Your description must not exceed 1000 characters",
    },
  },

  url: {
    url: {
      message: "^The url you typed in is not valid",
    },
  },

  price: {
    numericality: {
      greaterThan: 0,
      notGreaterThan: "^Please enter a price above 0",
      notValid: "^Please enter a valid price",
    },
  },
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    errorMessage: "",
    isValid: false,
  });

  const { onInputChange } = props;

  useEffect(() => {
    onInputChange(props.type, inputState.value, inputState.isValid);
  }, [onInputChange, inputState]);

  let object = {};

  let result;
  const inputChangeHandler = (text) => {
    object[props.type] = text;
    // console.log(object);
    result = validate(object, constraints);
    // console.log(result);
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

  const changeValueOnBlur = () => {
    dispatch({
      type: CHANGE_VALUE_ON_BLUR,
      value: isNaN(inputState.value) ? "0.00" : (+inputState.value).toFixed(2),
    });
  };

  useEffect(() => {
    inputChangeHandler(props.initialValue ? props.initialValue : "");
  }, []);

  return (
    <View style={styles.container}>
      {props.label && (
        <EmphasisText style={styles.label}>{props.label}</EmphasisText>
      )}
      <View
        style={{
          marginHorizontal: props.style
            ? props.style.marginHorizontal
            : DeviceDimensions.width / 12,
        }}
      >
        <TextInput
          {...props}
          selectionColor="rgba(0,0,0,0.1)"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={{
            ...styles.input,
            textAlignVertical: "top",
            paddingTop: props.style.borderColor ? 5 : 0,
            height: props.multiline ? 100 : 30,
            width: props.style
              ? props.style.width
                ? props.style.width
                : "100%"
              : "100%",
            borderColor: props.style.borderColor
              ? props.style.borderColor
              : null,
            borderWidth: props.style.borderColor ? 1.5 : 0,
            borderBottomColor:
              !inputState.isValid && props.show
                ? Colors.accent
                : props.style.borderBottomColor,
            color: props.style.color ? props.style.color : "white",
            fontSize: props.style.fontSize ? props.style.fontSize : 16,
            borderRadius: props.style.borderColor ? 5 : 0,
          }}
          onChangeText={inputChangeHandler}
          value={inputState.value}
          onEndEditing={props.type === "price" ? changeValueOnBlur : null}
        />
        {!inputState.isValid && props.show && (
          <Text
            style={{
              color: Colors.accent,
              textAlign: "left",
              marginBottom: -5,
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
    marginTop: 40,
    marginHorizontal: Dimensions.get("window").width / 10.275,
    color: "white",
  },

  input: {
    borderBottomWidth: 1.5,
    marginTop: 5,
    paddingHorizontal: 7,
    paddingBottom: 2,
  },
});

export default Input;
