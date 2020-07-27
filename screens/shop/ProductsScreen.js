import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Screen from "../../components/UI/BasicScreen";
import SearchBar from "../../components/SearchBar";
import BodyText from "../../components/Text/BodyText";
import ProductItem from "../../components/UI/ProductItem";
import SortByDropDown from "../../components/UI/SortByDropDown";

import Colors from "../../constants/Colors";
import EmphasisText from "../../components/Text/EmphasisText";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";

import * as productsActions from "../../store/actions/products";

import { SORT_BY_OPTIONS } from "../../data/sort_by";
import { ActivityIndicator } from "react-native-paper";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// const renderListItem = (onPress, itemData) => {
//   return (
//     <View style={styles.listItem}>
//       <ProductItem
//         style={{
//           width: 166.365,
//           height: 255.093,
//         }}
//         // cardContainerStyle={
//         //   side === "right" && {
//         //     marginLeft: 12,
//         //   }
//         // }
//         titleStyle={{
//           fontSize: 18,
//         }}
//         onTap={onPress}
//         id={itemData.item.id}
//         thumbnail={itemData.item.thumbnail}
//         title={itemData.item.title}
//         price={itemData.item.price}
//         rating={itemData.item.rating}
//       />
//     </View>
//   );
// };

const ProductsScreen = (props) => {
  const [sortBy, setSortBy] = useState("Newest to Oldest");
  const [isExpanded, setIsExpanded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const search = props.route.params.search;
  const type = props.route.params.type;

  const allProducts = useSelector((state) => state.products.availableProducts);
  // let products;

  // if (type) {
  //   products
  // }
  let products = type && props.route.params.products;
  // : allProducts.filter((product) =>
  //     product.categories.includes("Men's Fashion")
  //   );

  // console.log(allProducts);
  // console.log(products);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      await dispatch(productsActions.fetchFilteredProducts("search", search));
    };

    if (search) {
      fetchFilteredProducts();
    }
  }, [search]);

  if (search) {
    products = useSelector((state) => state.products.filteredProducts);
  }

  // let fP = useSelector((state) => state.products.filteredProducts);

  // console.log("Filtered Products: ");
  // console.log(fP);

  // let filteredProducts = [];

  // for (const key in allProducts) {
  //   if (allProducts[key].categories.includes("Men's Fashion")) {
  //     filteredProducts.push(allProducts[key]);
  //   }
  // }
  let comparison = 0;

  const comparePopularity = (a, b) => {
    // console.log(a.views);
    if (a.views.totalViews > b.views.totalViews) {
      comparison = -1;
    } else if (a.views.totalViews < b.views.totalViews) {
      comparison = 1;
    }
    return comparison;
  };

  const compareNames = (a, b) => {
    // console.log(a.title);
    if (a.title > b.title) {
      comparison = 1;
    } else if (a.title < b.title) {
      comparison = -1;
    }
    return comparison;
  };

  const compareDate = (a, b) => {
    // console.log("A DATE");

    // console.log(a.date);
    // console.log("B DATE");

    // console.log(b.date);
    if (a.date > b.date) {
      comparison = sortBy === "Oldest to Newest" ? 1 : -1;
    } else if (a.date < b.date) {
      comparison = sortBy === "Oldest to Newest" ? -1 : 1;
    }
    return comparison;
  };

  if (sortBy.includes("Oldest")) {
    products = products.sort(compareDate);
  } else if (sortBy === "Popularity") {
    // console.log("Popularity");
    products = products.sort(comparePopularity);
  } else if (sortBy === "Name") {
    products = products.sort(compareNames);
  }

  let leftArray = [];
  let rightArray = [];

  for (const index in products) {
    if (index % 2 === 0) {
      leftArray.push(products[index]);
    } else {
      rightArray.push(products[index]);
    }
  }

  let title;

  if (type === "recommended") {
    title = "All recommended products:";
  } else if (type === "popular") {
    title = "More popular products:";
  }

  const onPressHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  const renderListItem = (item, side) => {
    return (
      <View key={item.id} style={styles.listItem}>
        <ProductItem
          style={{
            width: 166.365,
            height: 255.093,
          }}
          cardContainerStyle={
            side === "right" && {
              marginLeft: 12,
            }
          }
          titleStyle={{
            fontSize: 18,
          }}
          onTap={onPressHandler}
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          rating={item.rating}
        />
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      removeClippedSubviews={true}
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <View
        style={{ flex: 1, backgroundColor: "white" }}
        // contentContainerStyle={{ paddingBottom: 60 }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 10,
          }}
        >
          {search ? (
            <View>
              <BodyText>Search results for: </BodyText>
              <Text
                style={{
                  color: Colors.accent,
                  fontFamily: "helvetica-bold",
                  fontSize: 12,
                  width: 180,
                }}
              >
                "{search}"
              </Text>
            </View>
          ) : (
            <BodyText>{title}</BodyText>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <BodyText>Sort by:{"  "}</BodyText>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: Colors.inactive_grey,
                  width: 133,
                  justifyContent: "center",
                  paddingVertical: 2,
                }}
              >
                <BodyText style={{ color: Colors.black }}>{sortBy}</BodyText>
                <Image
                  style={{
                    marginLeft: 5,
                    marginTop: isExpanded ? 0 : 2,
                    width: 6,
                    height: 6,
                    marginRight: -5,
                  }}
                  source={
                    isExpanded
                      ? require("../../assets/icons/drop_down_collapse.png")
                      : require("../../assets/icons/drop_down_arrow.png")
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {isExpanded && (
          <View
            style={{
              alignItems: "flex-end",
              marginHorizontal: 20,
              marginTop: -1,
            }}
          >
            {/* <View
          style={{
            width: 133,
            borderWidth: 1,
            borderColor: Colors.inactive_grey,
            alignItems: "center",
            paddingVertical: 2,
          }}
        > */}
            <SortByDropDown
              data={SORT_BY_OPTIONS}
              onPress={(label) => {
                setSortBy(label);
                setIsExpanded(false);
              }}
            />
            {/* </View> */}
          </View>
        )}

        {isLoading && <ActivityIndicator color={Colors.primary} size="small" />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 0,
          }}
        >
          {/* <FlatList
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}
          data={products}
          renderItem={renderListItem.bind(this, onPressHandler)}
          numColumns={2}
          initialNumToRender={4}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
          maxToRenderPerBatch={4}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> */}
          <View>{leftArray.map((item) => renderListItem(item, "left"))}</View>
          <View style={{ marginTop: 40 }}>
            {rightArray.map((item) => renderListItem(item, "right"))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 20,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: () => (
      <SearchBar
        onPress={() => {
          navData.navigation.navigate("Search");
        }}
      />
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          color={Colors.translucent_grey}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsScreen;
