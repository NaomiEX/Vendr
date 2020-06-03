import React, { useState } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [input, setInput] = useState("");

  const inputChangeHandler = (text) => {
    setInput(text);
  };

  return (
    <View style={styles.searchBar}>
      <View style={styles.textContainerStyle}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="rgba(0,0,0,0.3)"
          value={input}
          onChangeText={inputChangeHandler}
        />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name={Platform.OS === "android" ? "md-search" : "ios-search"}
          size={24}
          color="rgba(0,0,0,0.2)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: 248,
    height: 34,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255, 0.8)",
    flexDirection: "row",
    justifyContent: "center",
  },

  textContainerStyle: {
    width: 200,
    height: 34,
    justifyContent: "center",
  },

  iconContainer: {
    justifyContent: "center",
  },
});

export default SearchBar;
