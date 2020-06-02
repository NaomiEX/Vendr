import React, { useState } from "react";
import { YellowBox } from "react-native";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";

import authenticationReducer from "./store/reducers/authentication";
import userProfileReducer from "./store/reducers/authentication";

import NavigatorContainer from "./navigation/NavigatorContainer";

const fetchFonts = () => {
  return Font.loadAsync({
    "helvetica-standard": require("./assets/fonts/helvetica.ttf"),
    "helvetica-bold": require("./assets/fonts/helvetica-bold.ttf"),
  });
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  userProfile: userProfileReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  YellowBox.ignoreWarnings([
    "Setting a timer",
    "Possible Unhandled Promise Rejection",
  ]);
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

  return (
    <Provider store={store}>
      <NavigatorContainer />
    </Provider>
  );
}
