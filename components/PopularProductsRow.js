import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductSlider from "../components/UI/ProductSlider";
import BodyText from "../components/Text/BodyText";

import Colors from "../constants/Colors";

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
      <TouchableOpacity
        style={{ ...styles.seeMore, marginTop: 25 }}
        activeOpacity={0.6}
        onPress={props.onPressSeeMore.bind(this, "popular", sortedProducts)}
      >
        <BodyText style={{ color: Colors.accent }}>
          See all popular products
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

export default PopularProductsRow;
