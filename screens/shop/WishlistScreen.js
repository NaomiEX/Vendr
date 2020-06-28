import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../../components/UI/BasicScreen";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";
import WishlistItem from "../../components/WishlistItem";
import EmphasisText from "../../components/Text/EmphasisText";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as productsActions from "../../store/actions/products";
import { ActivityIndicator } from "react-native-paper";

const WishlistScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      // dispatch(activeComponentsActions.updateActiveScreen("Home"));
      setIsLoading(true);
      dispatch(productsActions.fetchProducts());
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const wishlist = useSelector((state) => state.wishlist.products);
  // console.log("WISHLIST SCREEN: ");
  // console.log(wishlist);

  let productIds = [];

  for (const key in wishlist) {
    productIds.push(wishlist[key].productId);
  }

  // console.log("WISHLIST PRODUCT IDS:");
  // console.log(productIds);

  const allProducts = useSelector((state) => state.products.availableProducts);
  // console.log("WISHLIST SCREEN PRODUCTS:");
  // console.log(allProducts);

  const filteredProducts = allProducts.filter((product) =>
    productIds.includes(product.id)
  );

  // console.log("WISHLIST SCREEN FILTERED PRODUCTS:");
  // console.log(filteredProducts);

  const onPressHandler = (productId) => {
    props.navigation.navigate("Product Details", { id: productId });
  };

  const renderWishlistItem = (item) => {
    // console.log("ITEM: " + item);
    return (
      <View key={item.id} style={styles.wishlistItem}>
        <WishlistItem
          wishlistData={wishlist}
          data={item}
          onPress={onPressHandler}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, marginRight: 5, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Screen style={{ paddingTop: 50 }}>
        <TitleText style={{ textAlign: "center", color: Colors.primary }}>
          Wishlist
        </TitleText>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Divider dividerStyle={{ width: 30, height: 2 }} />
        </View>
        {wishlist.length > 0 ? (
          // <FlatList
          //   style={{ marginTop: 20 }}
          //   data={filteredProducts}
          //   renderItem={renderWishlistItem}
          // />
          <View style={{ marginTop: 40 }}>
            {filteredProducts.map((item) => renderWishlistItem(item))}
          </View>
        ) : (
          <View style={styles.emptyText}>
            <EmphasisText
              style={{ textAlign: "center", color: Colors.inactive_grey }}
            >
              No Items found in your wishlist. Consider adding some.
            </EmphasisText>
          </View>
        )}
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wishlistItem: {
    marginBottom: 10,
    marginTop: 10,
  },

  emptyText: {
    alignItems: "center",
    marginTop: DeviceDimensions.height / 3,
    marginHorizontal: 20,
  },
});

export default WishlistScreen;
