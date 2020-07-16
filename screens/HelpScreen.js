import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";

import { List } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

import Screen from "../components/UI/BasicScreen";
import TitleText from "../components/Text/TitleText";
import Divider from "../components/UI/Divider";
import EmphasisText from "../components/Text/EmphasisText";
import HelpScreenAccordion from "../components/UI/HelpScreenAccordion";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

import * as activeComponentsActions from "../store/actions/activeComponents";

const HelpScreen = (props) => {
  const [question, setQuestion] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Help", "top"));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const inputChangeHandler = (text) => {
    setQuestion(text);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Screen>
        <View style={{ alignItems: "center" }}>
          <TitleText style={{ color: Colors.primary }}>Help</TitleText>
          <Divider
            dividerStyle={{
              width: 20,
              height: 2,
              marginTop: 5,
            }}
          />
        </View>
        <Text style={{ ...styles.headerTitle, marginTop: 30 }}>FAQs</Text>
        <View style={{ marginHorizontal: 10 }}>
          <HelpScreenAccordion />
          <Text style={{ ...styles.headerTitle, marginTop: 60 }}>
            Ask a Question
          </Text>
          <TextInput
            value={question}
            onChangeText={inputChangeHandler}
            multiline
            style={styles.askQuestionTextBox}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setQuestion("");
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                margin: 20,
              }}
            >
              <EmphasisText style={{ color: "#4a4a4a" }}>Send Now</EmphasisText>
              <Image
                style={{ marginLeft: 5 }}
                source={require("../assets/icons/next_arrow.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Screen>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    color: Colors.inactive_grey,
    fontFamily: "helvetica-standard",
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  categoryTitle: {
    fontSize: 16,
    fontFamily: "helvetica-standard",
    color: "black",
  },

  question: {
    fontFamily: "helvetica-bold",
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 20,
  },

  answer: {
    fontSize: 14,
    fontFamily: "helvetica-standard",
    color: Colors.black,
    marginLeft: 20,
    marginTop: -20,
  },

  askQuestionTextBox: {
    borderWidth: 1.5,
    borderColor: Colors.translucent_grey,
    height: 100,
    color: Colors.black,
    marginHorizontal: 20,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default HelpScreen;
