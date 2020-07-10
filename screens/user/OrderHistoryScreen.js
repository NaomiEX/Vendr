import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import OrderHistoryItem from "../../components/UI/OrderHistoryItem";

import Colors from "../../constants/Colors";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as ordersActions from "../../store/actions/orders";
import * as addressesActions from "../../store/actions/addresses";

const OrderHistoryScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(
        activeComponentsActions.updateActiveScreen("Order History", "top")
      );
      dispatch(ordersActions.getOrders());
      dispatch(addressesActions.getShippingAddress());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const orders = useSelector((state) => state.orders.orders);
  // console.log("ORDERS FROM REDUCER:");
  // console.log(orders);

  const renderOrderItem = (order) => {
    return (
      <View key={order.id}>
        <OrderHistoryItem
          orderId={order.orderId}
          orderDate={order.orderDate}
          orderItems={order.items}
          orderTotal={order.total}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={{ alignItems: "center" }}>
        <TitleText style={{ color: Colors.primary }}>Order History</TitleText>
        <Divider dividerStyle={{ width: 30, height: 2, marginTop: 5 }} />
      </View>
      <View>{orders.map((order) => renderOrderItem(order))}</View>
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

const styles = StyleSheet.create({});

export default OrderHistoryScreen;
