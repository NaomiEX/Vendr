import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import { useDispatch } from "react-redux";

import * as cartActions from "../store/actions/cart";

import BodyText from "../components/Text/BodyText";
import AddToCartButton from "../components/AddToCartButton";

import Colors from "../constants/Colors";

import { Rating } from "react-native-ratings";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const CartItem = (props) => {
  const { product, ownerUsername } = props;

  if (props.checkout) {
    TouchableComponent = View;
  }

  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(cartActions.removeFromCart(product.id, props.sum));
  };

  return (
    <TouchableComponent
      useForeground={true}
      onPress={props.onTouch.bind(this, product.id)}
    >
      <View style={styles.cartItem}>
        <Image
          style={{ width: 110, height: 160 }}
          source={{ uri: product.thumbnail.imageUrl }}
        />
        {/* main content */}
        <View style={styles.mainContentContainer}>
          {/* 1st row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{product.title}</Text>
            {!props.checkout && (
              <TouchableOpacity activeOpacity={0.6} onPress={removeFromCart}>
                <Image
                  style={styles.grayCross}
                  source={require("../assets/icons/gray_cross.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* 2nd row */}
          <BodyText
            style={{ ...styles.owner, marginTop: props.checkout ? 5 : -3 }}
          >
            By {ownerUsername}
          </BodyText>
          <View style={{ alignItems: "baseline", marginTop: 10 }}>
            <Rating
              startingValue={product.rating.average}
              readonly={true}
              imageSize={20}
              fractions={1}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.mainRow}>
              <Text style={styles.price}>${product.price}</Text>
              <View style={{ marginRight: 5 }}>
                <AddToCartButton
                  cart={true}
                  productId={product.id}
                  productPrice={product.price}
                  ownerUsername={ownerUsername}
                  checkout={props.checkout ? true : false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    width: "100%",
    height: 160,
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
    flexDirection: "row",
  },

  mainContentContainer: {
    flex: 1,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 15,
    marginBottom: 10,
  },

  title: { width: 160, fontFamily: "helvetica-light", fontSize: 14 },

  grayCross: { width: 30, height: 30, marginTop: -4 },

  owner: {
    color: Colors.inactive_grey,
  },

  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontFamily: "helvetica-standard",
    fontSize: 30,
    color: Colors.black,
  },
});

export default CartItem;
