import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as addressesActions from "../../store/actions/addresses";
import BodyText from "../../components/Text/BodyText";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    return { ...state, [action.inputType]: action.input };
  }
};

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const BillingAddressScreen = (props) => {
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(addressesActions.getBillingAddress());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);
  const billingAddress = useSelector((state) => state.addresses.billingAddress);
  // console.log("BILLING ADDRESS:");
  // console.log(billingAddress);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    name: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, input) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        inputType: inputIdentifier,
        input,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    for (const index in billingAddress) {
      if (index !== "id") {
        inputChangeHandler(index, billingAddress[index]);
      }
    }
  }, [billingAddress]);

  const ConfirmAddressButton = () => {
    return (
      <View
        style={{
          width: 201,
          height: 46,
          marginLeft: 20,
          marginTop: 40,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <TouchableComponent
            onPress={() => {
              setButtonPressed(true);
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 201,
                height: 46,
                backgroundColor: Colors.primary,
              }}
            >
              <Text style={styles.buttonText}>Confirm Address</Text>
            </View>
          </TouchableComponent>
        )}
      </View>
    );
  };

  console.log(formState);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
            setButtonPressed(false);
            setIsLoading(false);
          },
        },
      ]);
    }
  }, [error]);

  const {
    name,
    company,
    address,
    city,
    state,
    country,
    phoneNumber,
  } = formState;

  useEffect(() => {
    const confirmAddressHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      setIsLoading(true);
      let isValid = true;
      for (const key in formState) {
        if (!(key === "company" || key === "state" || key === "phoneNumber")) {
          isValid = isValid && formState[key];
        }
      }

      if (!isValid) {
        setError("Please fill out the required fields");
      } else {
        try {
          billingAddress
            ? await dispatch(
                addressesActions.editBillingAddress(
                  billingAddress.id,
                  name,
                  company,
                  address,
                  city,
                  state,
                  country,
                  phoneNumber
                )
              )
            : await dispatch(
                addressesActions.storeBillingAddress(
                  name,
                  company,
                  address,
                  city,
                  state,
                  country,
                  phoneNumber
                )
              );
          setIsLoading(false);
          props.navigation.navigate(
            props.route.params ? "Checkout" : "Settings",
            {
              toastText: "Billing address saved",
            }
          );
        } catch (err) {
          if (pressed) {
            setError(err.message);
          }
          setIsLoading(false);
          setButtonPressed(false);
        }
      }
    };

    if (buttonPressed) {
      confirmAddressHandler();
    }
  }, [buttonPressed]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Screen>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={verticalOffset}
          >
            <View style={{ alignItems: "center" }}>
              <TitleText style={{ color: Colors.primary }}>
                Billing Address
              </TitleText>
              <Divider dividerStyle={{ width: 30, height: 2, marginTop: 5 }} />
            </View>
            <View style={{ paddingLeft: 20 }}>
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 40 }}
              >
                Name*
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(-250);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.name}
                onChangeText={inputChangeHandler.bind(this, "name")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 40 }}
              >
                Company
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(-200);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.company}
                onChangeText={inputChangeHandler.bind(this, "company")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 20 }}
              >
                Address*
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(-100);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.address}
                onChangeText={inputChangeHandler.bind(this, "address")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 20 }}
              >
                City*
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(-50);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.city}
                onChangeText={inputChangeHandler.bind(this, "city")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 20 }}
              >
                State
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(0);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.state}
                onChangeText={inputChangeHandler.bind(this, "state")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 20 }}
              >
                Country*
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(20);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.country}
                onChangeText={inputChangeHandler.bind(this, "country")}
              />
              <EmphasisText
                style={{ color: Colors.inactive_grey, marginTop: 20 }}
              >
                Phone Number
              </EmphasisText>
              <TextInput
                onFocus={() => {
                  setVerticalOffset(-20);
                }}
                onBlur={() => {
                  setVerticalOffset(0);
                }}
                style={styles.textInput}
                value={formState.phoneNumber}
                onChangeText={inputChangeHandler.bind(this, "phoneNumber")}
              />
            </View>
            <ConfirmAddressButton />
            <BodyText
              style={{
                color: Colors.inactive_grey,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              *required fields
            </BodyText>
          </KeyboardAvoidingView>
        </Screen>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: Colors.translucent_grey,
    borderBottomWidth: 1.5,
    width: DeviceDimensions.width * 0.6,
    color: Colors.black,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingBottom: 2,
    fontSize: 16,
  },

  postalCodeTextBox: {
    borderColor: Colors.translucent_grey,
    borderWidth: 1.5,
    color: Colors.black,
    paddingHorizontal: 10,
    width: 88,
    fontSize: 20,
    height: 42,
    textAlign: "center",
  },

  buttonText: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    color: "white",
  },
});

export default BillingAddressScreen;
