import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "../../store/actions/products";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import CartItem from "../../components/CartItem";

import Colors from "../../constants/Colors";
import BodyText from "../../components/Text/BodyText";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const renderCartItem = (product, cartItems) => {
    // console.log("CART ITEMS:");
    // console.log(cartItems[product.id].sum);
    return (
      <View
        style={{ marginHorizontal: 20, alignItems: "center" }}
        key={product.id}
      >
        <CartItem
          onTouch={(id) => {
            props.navigation.navigate("Product Details", {
              id,
            });
          }}
          product={product}
          ownerUsername={cartItems[product.id].ownerUsername}
          sum={cartItems[product.id].sum}
        />
      </View>
    );
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      setIsLoading(true);
      await dispatch(productsActions.fetchProducts());
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const CheckoutButton = (props) => {
    return (
      <View style={styles.checkoutTouchableCotainer}>
        <TouchableComponent onPress={props.onCheckoutPress}>
          <View style={styles.checkoutButtonContainer}>
            <Text style={styles.checkoutText}>Checkout</Text>
            <Image
              style={{ marginLeft: 10 }}
              source={require("../../assets/icons/checkout_next.png")}
            />
          </View>
        </TouchableComponent>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, backgroundColor: "white" }}
      >
        <Screen>
          <View style={{ alignItems: "center" }}>
            <TitleText style={{ color: Colors.primary }}>Cart</TitleText>
            <View style={{ marginTop: 5, marginBottom: 40 }}>
              <Divider dividerStyle={{ width: 10, height: 2 }} />
            </View>
          </View>
          <View style={{}}>
            {cartProducts.map((product) => renderCartItem(product, cartItems))}
          </View>
        </Screen>
      </ScrollView>
      <View style={styles.summaryRow}>
        <View>
          <BodyText style={styles.totalText}>TOTAL</BodyText>
          <Text style={styles.total}>${cartTotal.toFixed(2)}</Text>
        </View>
        <CheckoutButton
          onCheckoutPress={() => {
            cartProducts.length > 0 &&
              props.navigation.navigate("Checkout", {
                products: cartProducts,
              });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    height: 121,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  totalText: {
    color: Colors.inactive_grey,
    marginBottom: -10,
    marginTop: 8,
  },

  total: {
    color: "black",
    fontSize: 34,
    fontFamily: "helvetica-bold",
  },

  checkoutTouchableCotainer: {
    width: 150,
    height: 43,
    marginTop: 20,
    backgroundColor: Colors.primary,
  },

  checkoutButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  checkoutText: {
    fontFamily: "helvetica-light",
    fontSize: 20,
    color: "white",
  },
});

export default CartScreen;
