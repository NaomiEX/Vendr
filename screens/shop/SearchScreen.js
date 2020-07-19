import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../components/SearchBar";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import EmphasisText from "../../components/Text/EmphasisText";
import BodyText from "../../components/Text/BodyText";
import ProductSlider from "../../components/UI/ProductSlider";
import RecommendedProductsRow from "../../components/RecommendedProductsRow";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as searchActions from "../../store/actions/search";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SearchScreen = (props) => {
  const [focus, setFocus] = useState(false);
  const [removePressed, setRemovePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allProducts = useSelector((state) => state.products.availableProducts);
  // console.log(allProducts);

  const wishlist = useSelector((state) => state.wishlist.products);

  let wishlistProducts = [];

  for (const key in wishlist) {
    wishlistProducts.push(
      allProducts.filter((product) => product.id === wishlist[key].productId)[0]
    );
  }

  // console.log("WISHLIST PRODUCTS: ");
  // console.log(wishlistProducts);

  const searchHistory = useSelector((state) => state.search.history);
  searchHistory.splice(0, searchHistory.length - 5);

  // console.log("SEARCH HISTORY:");
  // console.log(searchHistory);
  // console.log("Search Suggestions: ");
  // console.log(searchSuggestions);

  const { navigation } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      setFocus(true);
      setIsLoading(true);
      await dispatch(searchActions.getSearchHistory());
      setIsLoading(false);
    });
    const unsubscribeBlur = navigation.addListener("blur", () => {
      setFocus(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    const reloadSearchHistory = async () => {
      setIsLoading(true);
      await dispatch(searchActions.getSearchHistory());
      setIsLoading(false);
    };

    if (removePressed) {
      reloadSearchHistory();
      setRemovePressed(false);
    }
  }, [removePressed]);

  const renderSearchHistoryItem = (itemData) => {
    return (
      <View
        key={itemData.id}
        style={{
          paddingLeft: 5,
          borderBottomColor: Colors.translucent_grey,
          borderBottomWidth: 1.5,
          marginTop: 10,
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "flex-start" }}
          onPress={() => {
            props.navigation.navigate("Products", {
              search: itemData.search,
            });
          }}
        >
          <EmphasisText style={{ color: Colors.inactive_grey }}>
            {itemData.search}
          </EmphasisText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={async () => {
            setRemovePressed(true);
            setIsLoading(true);
            await dispatch(searchActions.deleteSearchHistory(itemData.id));
            setIsLoading(false);
          }}
        >
          <BodyText style={{ color: Colors.accent }}>REMOVE</BodyText>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressProductHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  const onPressSeeMoreHandler = (type, products) => {
    props.navigation.navigate("Products", {
      type,
      products,
    });
  };

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}
    // >
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      keyboardShouldPersistTaps="always"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <View
          style={{
            marginLeft: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <TouchableComponent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={
                  Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
                }
                color={Colors.inactive_grey}
                size={26}
              />
            </View>
          </TouchableComponent>
        </View>
        <SearchBar
          style={{
            width: DeviceDimensions.width - 20,
            marginLeft: -30,
            marginTop: 2,
          }}
          typeable
          focus={focus}
          search={(input) => {
            // console.log("SUGGESTIONS TO PASS ON: ");
            // console.log(suggestions);
            dispatch(searchActions.storeSearch(input));
            props.navigation.navigate("Products", {
              search: input,
            });
          }}
          allProducts={allProducts}
        />
        <View
          style={{
            marginLeft: -55,
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <TouchableComponent
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                color={Colors.inactive_grey}
                size={26}
              />
            </View>
          </TouchableComponent>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <CategoryHeaderText>Search History</CategoryHeaderText>
        {isLoading && <ActivityIndicator size="small" color={Colors.primary} />}
        {searchHistory
          .reverse()
          .map((searchItem) => renderSearchHistoryItem(searchItem))}
        <CategoryHeaderText style={{ marginBottom: 20, marginTop: 50 }}>
          Items in your wishlist
        </CategoryHeaderText>
        <ProductSlider
          data={
            wishlistProducts.length > 9
              ? wishlistProducts.slice(0, 10)
              : wishlistProducts
          }
          onTap={onPressProductHandler}
        />
        <CategoryHeaderText style={{ marginBottom: 20, marginTop: 50 }}>
          Recommended Products
        </CategoryHeaderText>
        <RecommendedProductsRow
          products={allProducts}
          onPressProduct={onPressProductHandler}
          onPressSeeMore={onPressSeeMoreHandler}
        />
      </View>
    </ScrollView>
    // </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({});

export default SearchScreen;
