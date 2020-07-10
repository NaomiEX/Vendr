import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

import BodyText from "../../components/Text/BodyText";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";

const AddressesInfoCard = (props) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <BodyText style={{ ...styles.label, marginTop: 0 }}>NAME</BodyText>
          <Text style={styles.addressInfoText}>{props.addressesInfo.name}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPressEdit}>
          <Image source={require("../../assets/icons/edit_card.png")} />
        </TouchableOpacity>
      </View>
      <BodyText style={styles.label}>ADDRESS</BodyText>
      <Text style={styles.addressInfoText}>{props.addressesInfo.address}</Text>
      <View style={{ flexDirection: "row" }}>
        <View>
          <BodyText style={styles.label}>CITY</BodyText>
          <Text style={styles.addressInfoText}>{props.addressesInfo.city}</Text>
        </View>
        <View style={{ marginLeft: 100 }}>
          <BodyText style={styles.label}>COUNTRY</BodyText>
          <Text style={styles.addressInfoText}>
            {props.addressesInfo.country}
          </Text>
        </View>
      </View>
      <BodyText style={styles.label}>POSTAL CODE</BodyText>
      <Text style={styles.addressInfoText}>
        {props.addressesInfo.postalCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.barely_there_grey,
    marginHorizontal: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },

  label: {
    color: Colors.inactive_grey,
    marginTop: 15,
    marginBottom: -5,
    letterSpacing: 0.5,
  },

  addressInfoText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: "helvetica-light",
    letterSpacing: 0.5,
  },
});

export default AddressesInfoCard;
