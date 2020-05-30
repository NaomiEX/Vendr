import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";

import authenticationReducer from "./store/reducers/Authentication";

import NavigatorContainer from "./navigation/NavigatorContainer";

const fetchFonts = () => {
  return Font.loadAsync({
    "helvetica-standard": require("./assets/fonts/helvetica.ttf"),
    "helvetica-bold": require("./assets/fonts/helvetica-bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return <NavigatorContainer />;
}

const styles = StyleSheet.create({});
