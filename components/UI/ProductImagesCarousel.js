import React, { useState, useEffect, memo } from "react";
import { View, Image, StyleSheet, Text, ActivityIndicator } from "react-native";

import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
  Progressive,
  ShineOverlay,
} from "rn-placeholder";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

const ProductImagesCarousel = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const CarouselItem = memo((props) => {
    return (
      <View>
        {isLoading && (
          // <View
          //   style={{
          //     width: DeviceDimensions.width,
          //     height: DeviceDimensions.width * 0.9,
          //     backgroundColor: Colors.translucent_grey,
          //     justifyContent: "center",
          //     alignItems: "center",
          //   }}
          // >
          //   <ActivityIndicator size="large" color={Colors.primary} />
          // </View>
          <Placeholder Animation={Progressive}>
            <PlaceholderMedia
              style={{
                width: DeviceDimensions.width,
                height: DeviceDimensions.width * 0.9,
              }}
            />
          </Placeholder>
        )}
        <Image
          onLoad={() => {
            setIsLoading(false);
          }}
          style={
            isLoading
              ? {}
              : {
                  width: DeviceDimensions.width,
                  height: DeviceDimensions.width * 0.9,
                }
          }
          source={{ uri: props.imageUrl }}
        />
      </View>
    );
  });

  const renderCarouselItem = (itemData) => {
    return (
      // <View>
      //   {isLoading && (
      //     <View
      //       style={{
      //         width: DeviceDimensions.width,
      //         height: DeviceDimensions.width * 0.9,
      //         backgroundColor: Colors.translucent_grey,
      //         justifyContent: "center",
      //         alignItems: "center",
      //       }}
      //     >
      //       <ActivityIndicator size="large" color={Colors.primary} />
      //     </View>
      //   )}
      //   <Image
      //     onLoad={() => {
      //       setIsLoading(false);
      //     }}
      //     style={
      //       isLoading
      //         ? {}
      //         : {
      //             width: DeviceDimensions.width,
      //             height: DeviceDimensions.width * 0.9,
      //             backgroundColor: "#cccccc",
      //           }
      //     }
      //     source={{ uri: itemData.item.imageUrl }}
      //   />
      // </View>
      <CarouselItem imageUrl={itemData.item.imageUrl} />
    );
  };

  // if (isLoading === true) {
  //   return (
  //     <View
  //       style={{
  //         width: DeviceDimensions.width,
  //         height: 200,
  //         backgroundColor: "gray",
  //       }}
  //     ></View>
  //   );
  // }

  return (
    <View>
      <Carousel
        removeClippedSubviews={true}
        initialNumToRender={1}
        data={props.data}
        renderItem={renderCarouselItem}
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
