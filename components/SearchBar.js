import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import EmphasisText from "../components/Text/EmphasisText";
import RecommendedProductsRow from "../components/RecommendedProductsRow";

import Colors from "../constants/Colors";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [autoSearch, setAutoSearch] = useState(false);

  const inputChangeHandler = (text) => {
    let ss = [];
    if (text === "") {
      setSearchSuggestion([]);
    }
    for (const key in props.allProducts) {
      if (
        text != "" &&
        props.allProducts[key].title
          .toUpperCase()
          .startsWith(text.toUpperCase()) &&
        !ss.includes(props.allProducts[key])
      ) {
        // console.log("I AM HERE");
        ss.push(props.allProducts[key]);
        // searchSuggestion.push(props.allProducts[key]);
      }
      setSearchSuggestion(ss);
    }
    // props.setSuggestions(searchSuggestion);
    setInput(text);
  };

  // console.log("SEARCH RESULT");
  // console.log(searchSuggestion);

  useEffect(() => {
    if (autoSearch) {
      props.search(input);
    }
  }, [autoSearch]);

  const { focus } = props;
  useEffect(() => {
    setInput("");
    setAutoSearch(false);
    setSearchSuggestion([]);
  }, [focus]);

  const renderSearchSuggestion = (itemData) => {
    // console.log("ITEM DATAAAA");
    // console.log(itemData[0]);
    return (
      <View
        key={itemData.id}
        style={{
          height: 50,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <TouchableComponent
          style={{ flex: 1 }}
          style={{}}
          onPress={() => {
            setInput(itemData.title);
            setAutoSearch(true);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 8,
            }}
          >
            <Ionicons
              style={{ marginRight: 20 }}
              name={Platform.OS === "android" ? "md-search" : "ios-search"}
              size={24}
              color={Colors.inactive_grey}
            />
            <EmphasisText style={{ marginRight: 220 }}>
              {itemData.title}
            </EmphasisText>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setInput(itemData.title);
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/copy_to_searchbar_arrow.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableComponent>
      </View>
    );
  };

  return (
    <View style={props.style}>
      <View
        style={{
          ...styles.searchBar,
          marginLeft: props.typeable ? 50 : 0,
          backgroundColor: props.barStyle
            ? props.barStyle.color
            : Colors.translucent_grey,
        }}
      >
        <View style={styles.textContainerStyle}>
          {props.typeable ? (
            <TextInput
              returnKeyType="search"
              autoCapitalize="sentences"
              placeholder="Search here"
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={styles.inputText}
              onChangeText={inputChangeHandler}
              value={input}
              onSubmitEditing={() => {
                props.search(input);
              }}
            />
          ) : (
            <Text {...props} style={styles.searchText}>
              Search here
            </Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name={
              input === ""
                ? Platform.OS === "android"
                  ? "md-search"
                  : "ios-search"
                : Platform.OS === "android"
                ? "md-close-circle"
                : "ios-close-circle"
            }
            size={24}
            onPress={() => {
              if (input !== "") {
                setInput("");
                setSearchSuggestion([]);
              }
            }}
            color={
              props.typeable
                ? input
                  ? "rgba(0,0,0,0.4)"
                  : "rgba(0,0,0,0.6)"
                : "rgba(0,0,0,0.2)"
            }
          />
        </View>
      </View>
      <View
        style={{
          marginLeft: -5,
          marginRight: 15,
          marginTop: props.typeable ? 10 : 0,
        }}
      >
        {/* <FlatList
          keyboardShouldPersistTaps="always"
          data={searchSuggestion}
          renderItem={renderSearchSuggestion}
        /> */}
        {searchSuggestion.map((suggestion) =>
          renderSearchSuggestion(suggestion)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: 248,
    height: 34,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  textContainerStyle: {
    width: 200,
    height: 34,
    justifyContent: "center",
  },

  inputText: { color: "rgba(0,0,0,0.8)" },

  searchText: {
    color: "rgba(0,0,0,0.5)",
  },

  iconContainer: {
    justifyContent: "center",
  },
});

export default SearchBar;
