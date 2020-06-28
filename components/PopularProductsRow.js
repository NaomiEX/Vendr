import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductSlider from "../components/UI/ProductSlider";

const PopularProductsRow = (props) => {
  const compare = (a, b) => {
    let comparison = 0;
    if (a.views.totalViews > b.views.totalViews) {
      comparison = -1;
    } else if (a.views.totalViews < b.views.totalViews) {
      comparison = 1;
    }
    return comparison;
  };

  // console.log("SORTTTTTTTTTTT");
  let sortedProducts = props.products.sort(compare);
  // console.log(sortedProducts);

  return (
    <View style={props.style}>
      <ProductSlider
        data={sortedProducts.slice(0, 10)}
        onTap={props.onPressProduct}
      />
    </View>
  );
};

export default PopularProductsRow;
