import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductSlider from "../components/UI/ProductSlider";
import BodyText from "../components/Text/BodyText";

import Colors from "../constants/Colors";

const RecommendedProductsRow = (props) => {
  const userId = useSelector((state) => state.authentication.userId);
  const filteredProducts = props.products.filter(
    (product) => product.views.users && product.views.users[userId]
  );
  //   console.log("USER ID: " + userId);
  //   console.log("ALL PRODUCTS");
  //   console.log(props.products);
  //   console.log("FILTERED PRODUCTS:");
  //   console.log(filteredProducts);

  const compare = (a, b) => {
    let comparison = 0;
    if (a.views.users[userId].numOfViews > b.views.users[userId].numOfViews) {
      comparison = -1;
    } else if (
      a.views.users[userId].numOfViews < b.views.users[userId].numOfViews
    ) {
      comparison = 1;
    }
    return comparison;
  };

  let sortedProducts = filteredProducts.sort(compare);
  //   console.log("SORTED PRODUCTS");
  //   console.log(sortedProducts);
  let recommendedProducts = [];
  for (const key in sortedProducts) {
    for (const index in sortedProducts) {
      for (const categoryIndex in sortedProducts[key].categories) {
        if (
          sortedProducts[index].categories.includes(
            sortedProducts[key].categories[categoryIndex]
          ) &&
          !recommendedProducts.includes(sortedProducts[index])
        ) {
          recommendedProducts.push(sortedProducts[index]);
        }
      }
    }
  }

  //   console.log("RECOMMENDED PRODUCTS:");
  //   console.log(recommendedProducts);

  return (
    <View style={props.style}>
      <ProductSlider
        data={recommendedProducts.slice(0, 10)}
        onTap={props.onPressProduct}
      />
      <TouchableOpacity
        style={{ ...styles.seeMore, marginTop: 15 }}
        activeOpacity={0.6}
        onPress={props.onPressSeeMore.bind(
          this,
          "recommended",
          recommendedProducts
        )}
      >
        <BodyText style={{ color: Colors.accent }}>
          See all recommended products
        </BodyText>
        <Image source={require("../assets/icons/yellow_arrow.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },
});

export default RecommendedProductsRow;
