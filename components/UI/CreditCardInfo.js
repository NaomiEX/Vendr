import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import BodyText from "../../components/Text/BodyText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as cardActions from "../../store/actions/card";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const CreditCardInfo = (props) => {
  const [selectedCard, setSelectedCard] = useState(false);

  const dispatch = useDispatch();

  const { selectedId } = props;
  useEffect(() => {
    selectedId === props.info.id
      ? setSelectedCard(true)
      : setSelectedCard(false);
  }, [selectedId]);

  return (
    <View style={{ borderRadius: 20, overflow: "hidden" }}>
      <TouchableComponent
        onPress={
          props.onSelectCard.bind(this, props.info.id)
          // () => {}
        }
      >
        <View
          style={{
            ...styles.card,
            backgroundColor: props.fromCheckout
              ? selectedCard
                ? Colors.barely_there_grey
                : "white"
              : "white",
            borderColor: Colors.barely_there_grey,
            borderWidth: props.fromCheckout ? (selectedCard ? 0 : 1.5) : 0,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <BodyText style={{ ...styles.label, marginTop: 0 }}>
                CARDHOLDER NAME
              </BodyText>
              <Text style={styles.info}>{props.info.cardholderName}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={props.editCardInfo}>
              <Image source={require("../../assets/icons/edit_card.png")} />
            </TouchableOpacity>
          </View>
          <BodyText style={styles.label}>CREDITCARD NUMBER</BodyText>
          <Text style={styles.info}>{props.info.creditCardNumber}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 30 }}>
              <BodyText style={styles.label}>EXPIRATION DATE</BodyText>
              <Text style={styles.info}>{props.info.expirationDate}</Text>
            </View>
            <View>
              <BodyText style={styles.label}>CVV</BodyText>
              <Text style={styles.info}>{props.info.cvv}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginBottom: -10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  props.deleteCard(props.info.id);
                }}
              >
                <BodyText
                  style={{
                    color: Colors.black,
                    letterSpacing: 1,
                  }}
                >
                  REMOVE
                </BodyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: DeviceDimensions.width - 40,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  label: {
    color: "#9a9a9a",
    letterSpacing: 1,
    marginTop: 15,
  },

  info: {
    color: Colors.black,
    fontFamily: "helvetica-light",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default CreditCardInfo;
