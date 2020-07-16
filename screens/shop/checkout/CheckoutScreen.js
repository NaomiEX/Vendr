import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Screen from "../../../components/UI/BasicScreen";
import TitleText from "../../../components/Text/TitleText";
import Divider from "../../../components/UI/Divider";
import EmphasisText from "../../../components/Text/EmphasisText";
import AddressesInfoCard from "../../../components/UI/AddressesInfoCard";
import CartItem from "../../../components/CartItem";
import PrimaryButton from "../../../components/UI/PrimaryButton";
import BodyText from "../../../components/Text/BodyText";

import Colors from "../../../constants/Colors";

import * as addressesActions from "../../../store/actions/addresses";
import * as ordersActions from "../../../store/actions/orders";
import * as notificationsActions from "../../../store/actions/notifications";
import { ActivityIndicator } from "react-native-paper";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const CheckoutScreen = (props) => {
  const [methodSelected, setMethodSelected] = useState("Credit Card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { navigation } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener("focus", async () => {
      await dispatch(addressesActions.getShippingAddress());
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const shippingAddress = useSelector(
    (state) => state.addresses.shippingAddress
  );
  // console.log("SHIPPING ADDRESS:");
  // console.log(shippingAddress);

  let cartItemsIds = [];

  const cartItems = useSelector((state) => state.cart.items);
  // console.log("CART ITEMS:");
  // console.log(cartItems);

  for (const key in cartItems) {
    cartItemsIds.push(key);
  }

  const cartTotal = useSelector((state) => state.cart.totalAmount);

  const cartProducts = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => cartItemsIds.includes(product.id));

  // useEffect(() => {
  //   if (cartProducts.length < 1) {
  //     props.navigation.navigate("Cart");
  //   }
  // }, [cartProducts]);
  // console.log(cartItems);

  // console.log(cartProducts);

  // let owners = [];

  // // console.log("CART PRODUCTS: ");
  // // console.log(cartProducts);

  // for (const index in cartProducts) {
  //   // !owners.includes(cartProducts[index].ownerId) &&
  //   //   owners.push(cartProducts[index].ownerId);
  //   // console.log(cartProducts[index].ownerId);
  //   if (!owners.includes(cartProducts[index].ownerId)) {
  //     owners.push({ ownerId: cartProducts[index].ownerId, productName: cartProducts[index].title});
  //   }
  // }

  // console.log("OWNERS: ");
  // console.log(owners);

  const selectedCard = useSelector((state) => state.card.selectedCard);
  const billingAddress = useSelector((state) => state.addresses.billingAddress);

  // console.log("SELECTED CARD:");
  // console.log(selectedCard);
  // console.log("BILLING ADDRESS:");
  // console.log(billingAddress);

  let items = [];

  for (const key in cartProducts) {
    items.push({
      item: cartProducts[key],
      itemQuantity: cartItems[cartProducts[key].id].quantity,
    });
  }

  // console.log(items);

  const userId = useSelector((state) => state.authentication.userId);
  const placeOrderHandler = async () => {
    if (methodSelected === "Credit Card" && !selectedCard) {
      Alert.alert("No Card Chosen", "Please specify the card you want to use", [
        { text: "Ok" },
      ]);
    } else if (methodSelected === "Billing Address" && !billingAddress) {
      Alert.alert(
        "Billing Address Invalid",
        "Please provide the required information for your billing address",
        [{ text: "Ok" }]
      );
    } else {
      setOrderPlaced(true);
      await dispatch(ordersActions.storeOrder(items, cartTotal.toFixed(2)));

      for (const key in cartProducts) {
        await dispatch(
          notificationsActions.storeNotification(
            "transaction",
            cartProducts[key].ownerId,
            "Vendr_Official",
            `Your product: ${cartProducts[key].title} has been sold!`
          )
        );
        await dispatch(
          notificationsActions.storeNotification(
            "transaction",
            userId,
            "Vendr_Official",
            `You have purchased the product: ${cartProducts[key].title}`
          )
        );
      }
      // await dispatch(notificationsActions.storeNotification("official", ))
      setOrderPlaced(false);
      props.navigation.navigate("Home", {
        toastText: "Order Placed!",
        orderedProducts: cartProducts,
      });
    }
  };

  const renderCheckoutItem = (product) => {
    return (
      <View
        style={{ marginHorizontal: 20, alignItems: "center" }}
        key={product.id}
      >
        <CartItem
          onTouch={() => {}}
          checkout
          product={product}
          ownerUsername={cartItems && cartItems[product.id].ownerUsername}
          sum={cartItems[product.id].sum}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View>
          <View style={{ alignItems: "center" }}>
            <TitleText style={styles.title}>Checkout</TitleText>
            <Divider dividerStyle={{ width: 25, height: 2, marginTop: 5 }} />
          </View>
          <EmphasisText style={styles.header}>SHIPPING ADDRESS</EmphasisText>
          <AddressesInfoCard
            addressesInfo={shippingAddress}
            onPressEdit={() => {
              // console.log("Hello");
              props.navigation.navigate("Addresses", {
                fromCheckout: true,
              });
            }}
          />
          <EmphasisText style={styles.header}>PAYMENT METHOD</EmphasisText>
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginHorizontal: 20,
            }}
          >
            <TouchableComponent
              onPress={() => {
                if (methodSelected !== "Credit Card") {
                  setMethodSelected("Credit Card");
                }
              }}
            >
              <View
                style={{
                  ...styles.paymentMethodContainer,
                  backgroundColor:
                    methodSelected === "Credit Card"
                      ? Colors.barely_there_grey
                      : "white",
                  borderColor: Colors.barely_there_grey,
                  borderWidth: methodSelected === "Credit Card" ? 0 : 1.5,
                }}
              >
                <Text style={styles.paymentMethodText}>Credit Card</Text>
                {methodSelected === "Credit Card" && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      props.navigation.navigate("Manage Cards", {
                        fromCheckout: true,
                      });
                    }}
                  >
                    <Image source={require("../../../assets/icons/next.png")} />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableComponent>
          </View>
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginHorizontal: 20,
            }}
          >
            <TouchableComponent
              onPress={() => {
                if (methodSelected !== "Billing Address") {
                  setMethodSelected("Billing Address");
                }
              }}
            >
              <View
                style={{
                  ...styles.paymentMethodContainer,
                  backgroundColor:
                    methodSelected === "Billing Address"
                      ? Colors.barely_there_grey
                      : "white",
                  borderColor: Colors.barely_there_grey,
                  borderWidth: methodSelected === "Billing Address" ? 0 : 1.5,
                  marginTop: 10,
                }}
              >
                <Text style={styles.paymentMethodText}>Billing Address</Text>
                {methodSelected === "Billing Address" && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      props.navigation.navigate("Billing Address", {
                        fromCheckout: true,
                      });
                    }}
                  >
                    <Image source={require("../../../assets/icons/next.png")} />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableComponent>
            {methodSelected === "Credit Card" && !selectedCard && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: Colors.accent, marginTop: 10 }}>
                  No Credit Card Selected
                </Text>
              </View>
            )}
            {methodSelected === "Billing Address" && !billingAddress && (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: Colors.accent, marginTop: 10 }}>
                  Billing Address is invalid
                </Text>
              </View>
            )}
          </View>
          <EmphasisText style={styles.header}>ITEMS</EmphasisText>
          <View style={{ marginTop: 10 }}>
            {cartProducts.map((product) => renderCheckoutItem(product))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          height: 130,
          paddingHorizontal: 20,
          flexDirection: "row",
          paddingTop: 8,
          justifyContent: "space-between",
        }}
      >
        <View>
          <BodyText style={{ letterSpacing: 1, color: Colors.inactive_grey }}>
            TOTAL
          </BodyText>
          <Text
            style={{
              fontFamily: "helvetica-bold",
              fontSize: 36,
              color: Colors.black,
              marginTop: -10,
            }}
          >
            ${cartTotal.toFixed(2)}
          </Text>
        </View>
        {orderPlaced ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <View style={{ paddingTop: 16 }}>
            <PrimaryButton
              text="Place Order"
              onPress={placeOrderHandler}
              width={167}
              iconRight
              iconName="ios-arrow-forward"
              iconColor="white"
              fontSize={16}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
  },

  header: {
    color: Colors.inactive_grey,
    marginTop: 30,
    marginLeft: 20,
    letterSpacing: 0.8,
  },

  paymentMethodContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paymentMethodText: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    letterSpacing: 0.6,
    color: Colors.black,
  },
});

export default CheckoutScreen;
