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

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  // const uri =
  //   "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540naomiex%252FVendr/ImagePicker/ea77b1f7-11b4-42f9-a6a9-6fb02858f1f4.jpg";

  // var ref = firebase
  //   .storage()
  //   .ref()
  //   .child("images/" + "Test_Image.jpg");
  // const uploadImage = async (uri, imageName) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   console.log("********FIREBASE************");
  //   console.log(ref);
  //   ref.put(blob);
  //   const url = ref.getDownloadURL().then((durl) => console.log(durl));
  // };

  // uploadImage(uri, "Test_image");
  return (
    <Provider store={store}>
      <NavigatorContainer />
    </Provider>
  );
}
