import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import BodyText from "../../components/Text/BodyText";
import Divider from "../../components/UI/Divider";

import { Ionicons } from "@expo/vector-icons";

const renderItem = (orderItem) => {
  const itemSum = +orderItem.item.price * +orderItem.itemQuantity;

  return (
    <View key={orderItem.item.id}>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <Text style={{ width: 162.73, fontSize: 14 }}>
          {orderItem.item.title}
        </Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Text style={styles.quantity}>{orderItem.itemQuantity} pcs</Text>
          <Text style={styles.itemSum}>${itemSum.toFixed(2)}</Text>
        </View>
      </View>
      <Divider
        dividerStyle={{
          width: 312.73,
          height: 1.5,
          dividerColor: "#ebebeb",
        }}
      />
    </View>
  );
};

const OrderHistoryItem = (props) => {
  const shippingAddress = useSelector(
    (state) => state.addresses.shippingAddress
  );

  //   console.log("SHIPPING ADDRESS:");

  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={styles.orderId}>Order #{props.orderId}</Text>
        <BodyText style={{ color: Colors.inactive_grey }}>
          {props.orderDate}
        </BodyText>
      </View>
      {props.orderItems.map((orderItem) => renderItem(orderItem))}
      <View style={styles.mainRow}>
        <Ionicons
          style={{ marginBottom: 3 }}
          name={Platform.OS === "android" ? "md-pin" : "ios-pin"}
          size={18}
          color="white"
        />
        <BodyText style={{ marginLeft: 8, color: "white", marginBottom: 2 }}>
          {shippingAddress.address}
        </BodyText>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <BodyText
            style={{
              color: "white",
              marginBottom: 2,
              marginRight: 8,
            }}
          >
            Total
          </BodyText>
          <Text style={styles.total}>${props.orderTotal}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.barely_there_grey,
    marginHorizontal: 20,
    marginTop: 30,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  orderId: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    color: Colors.primary,
  },

  quantity: {
    position: "absolute",
    right: 100,
    fontSize: 14,
    fontFamily: "helvetica-light",
    color: Colors.grey,
  },

  itemSum: {
    fontSize: 14,
    fontFamily: "helvetica-light",
    color: Colors.grey,
  },

  mainRow: {
    backgroundColor: Colors.primary,
    marginTop: -1,
    marginHorizontal: -20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  total: {
    fontSize: 16,
    fontFamily: "helvetica-bold",
    color: "white",
  },
});

export default OrderHistoryItem;
