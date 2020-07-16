import React, { useState } from "react";
import { YellowBox } from "react-native";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";

import authenticationReducer from "./store/reducers/authentication";
import userProfileReducer from "./store/reducers/userProfile";
import activeComponentsReducer from "./store/reducers/activeComponents";
import productsReducer from "./store/reducers/products";
import otherUserProfilesReducer from "./store/reducers/otherUserProfiles";
import wishlistReducer from "./store/reducers/wishlist";
import cartReducer from "./store/reducers/cart";
import searchReducer from "./store/reducers/search";
import addressesReducer from "./store/reducers/addresses";
import cardReducer from "./store/reducers/card";
import ordersReducer from "./store/reducers/orders";
import notificationsReducer from "./store/reducers/notifications";
import productDiscussionReducer from "./store/reducers/productDiscussion";
import ratingsReducer from "./store/reducers/ratings";
import wishlistActivityReducer from "./store/reducers/wishlistActivity";

import NavigatorContainer from "./navigation/NavigatorContainer";

import * as firebase from "firebase";
import ApiKeys from "./constants/ApiKeys";

const fetchFonts = () => {
  return Font.loadAsync({
    "helvetica-standard": require("./assets/fonts/helvetica.ttf"),
    "helvetica-bold": require("./assets/fonts/helvetica-bold.ttf"),
    "helvetica-light": require("./assets/fonts/helvetica_light.ttf"),
  });
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  userProfile: userProfileReducer,
  activeComponents: activeComponentsReducer,
  products: productsReducer,
  otherUserProfiles: otherUserProfilesReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  search: searchReducer,
  addresses: addressesReducer,
  card: cardReducer,
  orders: ordersReducer,
  notifications: notificationsReducer,
  productDiscussion: productDiscussionReducer,
  ratings: ratingsReducer,
  wishlistActivity: wishlistActivityReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  YellowBox.ignoreWarnings([
    "Setting a timer",
    "Possible Unhandled Promise Rejection",
    "Can't perform a React state update",
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

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }
  return (
    <Provider store={store}>
      <NavigatorContainer />
    </Provider>
  );
}
