import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

const ProductImagesCarousel = (props) => {
  return (
    <View>
      <Carousel
        data={props.data}
        renderItem={props.renderCarouselItem}
        sliderWidth={props.sliderWidth}
        itemWidth={props.itemWidth}
        loop={props.loop ? true : false}
        onSnapToItem={props.onSnapToItem ? props.onSnapToItem : null}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // for product screen carousel
  // image: {
  //   width: DeviceDimensions.width,
  //   height: DeviceDimensions.height / 2,
  // },
});

export default ProductImagesCarousel;
