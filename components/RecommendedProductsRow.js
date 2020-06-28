import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductSlider from "../components/UI/ProductSlider";

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
    if (a.views.users[userId].nunmOfViews > b.views.users[userId].nunmOfViews) {
      comparison = -1;
    } else if (
      a.views.users[userId].nunmOfViews < b.views.users[userId].nunmOfViews
    ) {
      comparison = 1;
    }
    return comparison;
  };

  let sortedProducts = filteredProducts.sort(compare);
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
    </View>
  );
};

export default RecommendedProductsRow;
