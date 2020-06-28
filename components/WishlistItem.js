import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";

import { Rating } from "react-native-ratings";

import Colors from "../constants/Colors";

import * as wishlistActions from "../store/actions/wishlist";

const WishlistItem = (props) => {
  const [heartImage, setHeartImage] = useState(
    require("../assets/icons/heart.png")
  );
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // console.log("DATA:");
  // console.log(props.data);
  const wishlistData = props.wishlistData.filter(
    (wishlistItem) => wishlistItem.productId === props.data.id
  )[0];
  // console.log("WISHLIST NAME FOR " + props.data.title);
  // console.log(wishlistData);

  const onClickHandler = useCallback(() => {
    const deleteFromWishlist = async () => {
      setIsLoading(true);
      await dispatch(
        wishlistActions.deleteFromWishlist(wishlistData.wishlistName)
      );
    };
    if (heartImage === require("../assets/icons/heart.png")) {
      // setHeartImage(require("../../assets/icons/heart.png"));
      // dispatch(wishlistActions.addToWishlist(thisProduct));
      deleteFromWishlist();
    }
  }, [heartImage]);

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <View style={styles.touchableComponentContainer}>
      <TouchableComponent
        style={{ flex: 1 }}
        useForeground={true}
        onPress={props.onPress.bind(this, wishlistData.productId)}
      >
        <View style={styles.wishlistCard}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 99, height: 144 }}
              source={{ uri: props.data.thumbnail.imageUrl }}
            />
          </View>
          <View style={styles.mainContentContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text numberOfLines={2} style={styles.productTitle}>
                {props.data.title}
              </Text>
              <TouchableOpacity activeOpacity={0.6} onPress={onClickHandler}>
                <Image
                  style={{ width: 22, height: 20.28 }}
                  source={heartImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={styles.productPrice}>${props.data.price}</Text>
              <View style={styles.ratingsRowContainer}>
                <Rating
                  readonly={true}
                  startingValue={props.data.rating.average}
                  fractions={1}
                  imageSize={20}
                />
                <Text style={styles.ratingsData}>
                  {props.data.rating.average} | {props.data.rating.numOfRatings}{" "}
                  ratings
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableComponentContainer: {
    height: 144,
    elevation: 3,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 10,
    marginHorizontal: 15,
  },

  wishlistCard: {
    flexDirection: "row",
    flex: 1,
  },

  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },

  mainContentContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
    flex: 1,
  },

  productTitle: {
    fontFamily: "helvetica-light",
    fontSize: 16,
    width: 182,
  },
  productPrice: {
    fontSize: 24,
    fontFamily: "helvetica-light",
    color: Colors.accent,
    marginBottom: 10,
  },

  ratingsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingsData: {
    marginLeft: 15,
    fontFamily: "helvetica-standard",
    fontSize: 14,
    color: Colors.inactive_grey,
  },
});

export default WishlistItem;
