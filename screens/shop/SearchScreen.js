import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import SearchBar from "../../components/SearchBar";

const SearchScreen = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Text>Search Screen</Text>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => <SearchBar typeable />,
  };
};

const styles = StyleSheet.create({});

export default SearchScreen;
