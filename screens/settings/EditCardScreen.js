import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import BodyText from "../../components/Text/BodyText";
import DropDown from "../../components/DropDown";
import PrimaryButton from "../../components/UI/PrimaryButton";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as cardActions from "../../store/actions/card";

import { MONTHS } from "../../data/months";
import { YEARS } from "../../data/years";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    // console.log(action.inputType);
    if (
      (action.inputType.includes("credit") ||
        action.inputType.includes("cvv")) &&
      action.input.length > 4
    ) {
      return state;
    } else {
      return { ...state, [action.inputType]: action.input };
    }
  }
};

const EditCardScreen = (props) => {
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const cardInfo = props.route.params && props.route.params.cardInfo;
  // console.log("CARD INFO: ");
  // console.log(cardInfo);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    cardholderName: "",
    creditCardNumber1: "",
    creditCardNumber2: "",
    creditCardNumber3: "",
    creditCardNumber4: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, input) => {
      if (
        inputIdentifier.includes("credit") &&
        (isNaN(input) || input === " ")
      ) {
        // console.log("INVALID");
        return;
      }
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        inputType: inputIdentifier,
        input,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    for (const index in cardInfo) {
      if (index !== "id") {
        if (index === "creditCardNumber") {
          const split = cardInfo[index].split(" ");
          inputChangeHandler("creditCardNumber1", split[0]);
          inputChangeHandler("creditCardNumber2", split[1]);
          inputChangeHandler("creditCardNumber3", split[2]);
          inputChangeHandler("creditCardNumber4", split[3]);
        } else if (index === "expirationDate") {
          const splitDate = cardInfo[index].split(" ");
          inputChangeHandler("expirationMonth", splitDate[0]);
          inputChangeHandler("expirationYear", splitDate[1]);
        } else {
          inputChangeHandler(index, cardInfo[index]);
        }
      }
    }
  }, [cardInfo]);

  const {
    cardholderName,
    creditCardNumber1,
    creditCardNumber2,
    creditCardNumber3,
    creditCardNumber4,
    expirationMonth,
    expirationYear,
    cvv,
  } = formState;

  // console.log(formState);

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

  useEffect(() => {
    const confirmCardHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      setIsLoading(true);
      let isValid = true;
      for (const key in formState) {
        isValid = isValid && formState[key];
        if (key.includes("credit") || key.includes("cvv")) {
          isValid = isValid && formState[key].length === 4;
        }
      }

      if (!isValid) {
        setError("Please fill out all the fields");
      } else {
        try {
          let creditCardNumber =
            creditCardNumber1 +
            " " +
            creditCardNumber2 +
            " " +
            creditCardNumber3 +
            " " +
            creditCardNumber4;
          let expirationDate = expirationMonth + " " + expirationYear;
          cardInfo
            ? await dispatch(
                cardActions.editCard(
                  cardInfo.id,
                  cardholderName,
                  creditCardNumber,
                  expirationDate,
                  cvv
                )
              )
            : await dispatch(
                cardActions.storeCard(
                  cardholderName,
                  creditCardNumber,
                  expirationDate,
                  cvv
                )
              );
          setIsLoading(false);
          props.navigation.navigate("Manage Cards", {
            toastText: `Card successfully ${cardInfo ? "edited" : "created"}!`,
          });
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
      confirmCardHandler();
    }
  }, [buttonPressed]);

  let month;
  let year;

  if (cardInfo) {
    month = cardInfo.expirationDate.split(" ")[0];
    year = cardInfo.expirationDate.split(" ")[1];
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={verticalOffset}
        >
          <View style={{ alignItems: "center" }}>
            <TitleText style={{ color: Colors.primary }}>
              Add Credit Card
            </TitleText>
            <Divider dividerStyle={{ width: 30, height: 2, marginTop: 5 }} />
          </View>
          <View style={{ marginTop: 10, paddingLeft: 20 }}>
            <BodyText style={styles.label}>CARDHOLDER NAME</BodyText>
            <TextInput
              value={cardholderName}
              style={styles.textInput}
              onChangeText={inputChangeHandler.bind(this, "cardholderName")}
            />
            <BodyText style={styles.label}>CREDITCARD NUMBER</BodyText>
            <BodyText
              style={{
                color: Colors.translucent_grey,
                marginTop: -5,
                marginBottom: 10,
              }}
            >
              for example: 1234 1234 1234 1234
            </BodyText>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                keyboardType="number-pad"
                style={styles.creditCardNumberInput}
                value={creditCardNumber1}
                onChangeText={inputChangeHandler.bind(
                  this,
                  "creditCardNumber1"
                )}
              />
              <TextInput
                keyboardType="number-pad"
                style={styles.creditCardNumberInput}
                value={creditCardNumber2}
                onChangeText={inputChangeHandler.bind(
                  this,
                  "creditCardNumber2"
                )}
              />
              <TextInput
                keyboardType="number-pad"
                style={styles.creditCardNumberInput}
                value={creditCardNumber3}
                onChangeText={inputChangeHandler.bind(
                  this,
                  "creditCardNumber3"
                )}
              />
              <TextInput
                keyboardType="number-pad"
                style={styles.creditCardNumberInput}
                value={creditCardNumber4}
                onChangeText={inputChangeHandler.bind(
                  this,
                  "creditCardNumber4"
                )}
              />
            </View>
            <BodyText style={{ ...styles.label, marginBottom: 10 }}>
              EXPIRATION DATE
            </BodyText>
            <View style={{ flexDirection: "row" }}>
              <DropDown
                initialValue={cardInfo && month}
                style={{ marginRight: 10 }}
                listStyle={{ width: 120 }}
                inputIdentifier="expirationMonth"
                data={MONTHS}
                setSelectedItem={inputChangeHandler}
              />
              <DropDown
                initialValue={cardInfo && year}
                inputIdentifier="expirationYear"
                listStyle={{ width: 100 }}
                setSelectedItem={inputChangeHandler}
                data={YEARS}
              />
            </View>
            <BodyText style={styles.label}>CVV</BodyText>
            <TextInput
              keyboardType="number-pad"
              style={styles.creditCardNumberInput}
              value={cvv}
              onChangeText={inputChangeHandler.bind(this, "cvv")}
            />
            <View style={{ marginTop: 40, alignItems: "flex-start" }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <PrimaryButton
                  onPress={() => {
                    setButtonPressed(true);
                  }}
                  text="Confirm Card"
                  style={{ width: 146 }}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  label: { color: Colors.inactive_grey, marginTop: 30 },

  textInput: {
    borderBottomColor: Colors.translucent_grey,
    borderBottomWidth: 1.5,
    width: DeviceDimensions.width * 0.8,
    color: Colors.black,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingBottom: 2,
    fontSize: 16,
  },
  creditCardNumberInput: {
    borderColor: Colors.translucent_grey,
    borderWidth: 1.5,
    width: 75,
    height: 40,
    color: Colors.black,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 3.5,
    marginRight: 10,
  },
});

export default EditCardScreen;
