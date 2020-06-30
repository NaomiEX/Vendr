import React from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Screen from "../../components/UI/BasicScreen";
import SearchBar from "../../components/SearchBar";
import BodyText from "../../components/Text/BodyText";
import ProductItem from "../../components/UI/ProductItem";

import Colors from "../../constants/Colors";
import EmphasisText from "../../components/Text/EmphasisText";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";

const ProductsScreen = (props) => {
  const search = props.route.params.search;
  const type = props.route.params.type;

  const allProducts = useSelector((state) => state.products.availableProducts);
  let products = search
    ? allProducts.filter((product) => product.title.startsWith(search))
    : props.route.params.products;

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

  const renderListItem = (item) => {
    return (
      <View key={item.id} style={styles.listItem}>
        <ProductItem
          style={{
            width: 170.5,
            height: 248,
          }}
          cardContainerStyle={{
            marginRight: 12,
          }}
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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {search ? (
        <BodyText style={{ marginTop: 10, marginLeft: 20 }}>
          Search results for:{" "}
          <Text style={{ color: Colors.accent, fontFamily: "helvetica-bold" }}>
            "{search}"
          </Text>
        </BodyText>
      ) : (
        <CategoryHeaderText style={{ marginLeft: 20, marginVertical: 10 }}>
          {title}
        </CategoryHeaderText>
      )}
      <View style={{ flexDirection: "row", paddingLeft: 19 }}>
        <View>{leftArray.map((item) => renderListItem(item))}</View>
        <View style={{ marginTop: 40 }}>
          {rightArray.map((item) => renderListItem(item))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 12,
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
