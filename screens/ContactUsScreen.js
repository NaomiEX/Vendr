import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";

import Screen from "../components/UI/BasicScreen";
import TitleText from "../components/Text/TitleText";
import Divider from "../components/UI/Divider";
import BodyText from "../components/Text/BodyText";
import PrimaryButton from "../components/UI/PrimaryButton";

import Colors from "../constants/Colors";

import * as activeComponentsActions from "../store/actions/activeComponents";

const ContactUsScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Contact Us", "top"));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onInputChange = (type, text) => {
    switch (type) {
      case "name":
        setName(text);
        return;
      case "email":
        setEmail(text);
        return;
      case "message":
        setMessage(text);
        return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={{ alignItems: "center" }}>
          <TitleText style={{ color: Colors.primary }}>Contact Us</TitleText>
          <Divider dividerStyle={{ width: 20, height: 2, marginTop: 5 }} />
          <TitleText style={{ color: Colors.inactive_grey, marginTop: 50 }}>
            We'd <Text style={{ color: Colors.primary }}>love</Text> to help!
          </TitleText>
          <View style={{ marginHorizontal: 20, marginTop: 5 }}>
            <BodyText style={styles.subtitle}>
              Get in touch with our team and we can resolve all of your doubts
              and inquiries!
            </BodyText>
          </View>
        </View>
        <View style={{ marginHorizontal: 50, marginTop: 30 }}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            value={name}
            onChangeText={onInputChange.bind(this, "name")}
            style={styles.inputTextBox}
          />
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            value={email}
            onChangeText={onInputChange.bind(this, "email")}
            style={styles.inputTextBox}
          />
          <Text style={styles.label}>MESSAGE</Text>
          <TextInput
            value={message}
            multiline
            onChangeText={onInputChange.bind(this, "message")}
            style={styles.messageTextBox}
          />
          <PrimaryButton
            width={126}
            text="Send Now"
            onPress={() => {
              setName("");
              setEmail("");
              setMessage("");
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  subtitle: {
    textAlign: "center",
    color: Colors.inactive_grey,
    lineHeight: 18,
  },

  label: {
    fontFamily: "helvetica-bold",
    fontSize: 12,
    color: Colors.inactive_grey,
    marginTop: 20,
  },

  inputTextBox: {
    borderBottomColor: Colors.inactive_grey,
    borderBottomWidth: 1.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 14,
    fontFamily: "helvetica-standard",
  },

  messageTextBox: {
    borderWidth: 1.5,
    borderColor: Colors.inactive_grey,
    height: 100,
    marginTop: 10,
    textAlignVertical: "top",
    padding: 10,
    fontSize: 12,
    fontFamily: "helvetica-standard",
    marginBottom: 30,
  },
});

export default ContactUsScreen;
