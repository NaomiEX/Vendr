import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as addressesActions from "../../store/actions/addresses";

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

const AddressesScreen = (props) => {
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { navigation } = props;

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(addressesActions.getShippingAddress());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const shippingAddress = useSelector(
    (state) => state.addresses.shippingAddress
  );
  // console.log("Shipping address: ");
  // console.log(shippingAddress);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
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
    for (const index in shippingAddress) {
      if (index !== "id") {
        inputChangeHandler(index, shippingAddress[index]);
      }
    }
  }, [shippingAddress]);

  // console.log(formState);

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

  const { name, address, city, country, postalCode } = formState;

  useEffect(() => {
    const confirmAddressHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      setIsLoading(true);
      let isValid = true;
      for (const key in formState) {
        isValid = isValid && formState[key];
      }

      if (!isValid) {
        setError("Please fill out all the fields");
      } else {
        try {
          shippingAddress
            ? await dispatch(
                addressesActions.editShippingAddress(
                  shippingAddress.id,
                  name,
                  address,
                  city,
                  country,
                  postalCode
                )
              )
            : await dispatch(
                addressesActions.storeShippingAddress(
                  name,
                  address,
                  city,
                  country,
                  postalCode
                )
              );
          setIsLoading(false);
          setShowModal(true);
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
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={verticalOffset}
        >
          <View style={{ alignItems: "center" }}>
            <TitleText style={{ color: Colors.primary }}>
              Shipping Address
            </TitleText>
            <Divider dividerStyle={{ width: 20, height: 2, marginTop: 5 }} />
          </View>
          <View style={{ paddingLeft: 20 }}>
            <EmphasisText
              style={{ color: Colors.inactive_grey, marginTop: 40 }}
            >
              Name
            </EmphasisText>
            <TextInput
              onFocus={() => {
                setVerticalOffset(0);
              }}
              style={styles.textInput}
              value={formState.name}
              onChangeText={inputChangeHandler.bind(this, "name")}
            />
            <EmphasisText
              style={{ color: Colors.inactive_grey, marginTop: 20 }}
            >
              Address
            </EmphasisText>
            <TextInput
              onFocus={() => {
                setVerticalOffset(80);
              }}
              style={styles.textInput}
              value={formState.address}
              onChangeText={inputChangeHandler.bind(this, "address")}
            />
            <EmphasisText
              style={{ color: Colors.inactive_grey, marginTop: 20 }}
            >
              City
            </EmphasisText>
            <TextInput
              onFocus={() => {
                setVerticalOffset(130);
              }}
              style={styles.textInput}
              value={formState.city}
              onChangeText={inputChangeHandler.bind(this, "city")}
            />
            <EmphasisText
              style={{ color: Colors.inactive_grey, marginTop: 20 }}
            >
              Country
            </EmphasisText>
            <TextInput
              onFocus={() => {
                setVerticalOffset(120);
              }}
              style={styles.textInput}
              value={formState.country}
              onChangeText={inputChangeHandler.bind(this, "country")}
            />
            <EmphasisText
              style={{ color: Colors.inactive_grey, marginTop: 20 }}
            >
              Postal Code
            </EmphasisText>
            <TextInput
              onFocus={() => {
                setVerticalOffset(100);
              }}
              style={styles.postalCodeTextBox}
              value={formState.postalCode}
              onChangeText={inputChangeHandler.bind(this, "postalCode")}
            />
          </View>
          <ConfirmAddressButton />
        </KeyboardAvoidingView>
        <Modal animationType="fade" transparent visible={showModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <View
              style={{
                width: DeviceDimensions.width - 100,
                height: DeviceDimensions.height / 6,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 20,
              }}
            >
              <Text style={styles.modalText}>
                Is this address identical to your billing address?
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={async () => {
                    await dispatch(
                      addressesActions.storeBillingAddress(
                        name,
                        "",
                        address,
                        city,
                        "",
                        country,
                        ""
                      )
                    );
                    setShowModal(false);
                    props.navigation.navigate(
                      props.route.params ? "Checkout" : "Settings",
                      {
                        toastText: "Address succesfully stored",
                      }
                    );
                  }}
                >
                  <Text style={{ ...styles.modalText, color: Colors.primary }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setShowModal(false);
                    props.navigation.navigate(
                      props.route.params ? "Checkout" : "Settings",
                      {
                        toastText: "Address succesfully stored",
                      }
                    );
                  }}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      color: Colors.inactive_grey,
                      marginLeft: 30,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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

  modalText: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    color: Colors.black,
  },
});

export default AddressesScreen;
