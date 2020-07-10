import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as cartActions from "../store/actions/cart";

import EmphasisText from "../components/Text/EmphasisText";

import Colors from "../constants/Colors";

const AddToCartButton = (props) => {
  const [numInCart, setNumInCart] = useState(0);

  const dispatch = useDispatch();

  // console.log("Num IN Cart: " + numInCart);

  const cartItems = useSelector((state) => state.cart.items);

  // console.log("CART ITEMS FROM BUTTON SCREEN:");
  // console.log(cartItems);=

  useEffect(() => {
    if (cartItems[props.productId]) {
      setNumInCart(cartItems[props.productId].quantity);
    }
  }, [cartItems]);

  const removeFromCartHandler = () => {
    setNumInCart(numInCart - 1);
    dispatch(cartActions.reduceFromCart(props.productId, +props.productPrice));
  };

  const addToCartHandler = () => {
    setNumInCart(numInCart + 1);
    dispatch(
      cartActions.addToCart(
        props.productId,
        +props.productPrice,
        props.ownerUsername
      )
    );
  };

  // console.log("PRODUCT ID: " + props.productId);
  // console.log("PRODUCT PRICE: " + props.productPrice);

  if (props.checkout) {
    return (
      <View>
        <Text
          style={{
            fontSize: 36,
            fontFamily: "helvetica-light",
            color: Colors.inactive_grey,
          }}
        >
          x{numInCart}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {numInCart === 0 ? (
        <TouchableOpacity activeOpacity={0.6} onPress={addToCartHandler}>
          <View style={styles.button}>
            <EmphasisText style={styles.buttonText}>Add To Cart</EmphasisText>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginRight: props.cart ? 10 : 15 }}
            onPress={removeFromCartHandler}
          >
            <Image
              style={props.cart ? { width: 25, height: 25 } : {}}
              source={
                props.cart
                  ? require("../assets/icons/reduce_quantity.png")
                  : require("../assets/Remove_From_Cart.png")
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "helvetica-standard",
              color: props.cart ? Colors.inactive_grey : Colors.accent,
            }}
          >
            {numInCart}
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={addToCartHandler}
            style={{ marginLeft: props.cart ? 10 : 15 }}
          >
            <Image
              style={props.cart ? { width: 25, height: 25 } : {}}
              source={
                props.cart
                  ? require("../assets/icons/add_quantity.png")
                  : require("../assets/Add_To_Cart.png")
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 139,
    height: 37,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: Colors.accent,
  },
});

export default AddToCartButton;
