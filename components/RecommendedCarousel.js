import React, { useRef, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { Rating } from "react-native-ratings";

import BodyText from "../components/Text/BodyText";

import DeviceDimensions from "../constants/DeviceDimensions";
import Colors from "../constants/Colors";

const data = [
  require("../assets/large_banner/Art.png"),
  require("../assets/large_banner/Tech.png"),
  require("../assets/large_banner/Summer_Apparel.png"),
];

const RecommendedCarousel = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef();

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

  const slicedRecommendedProducts = recommendedProducts.slice(0, 5);
  //   const customDotElement = (props) => {
  //     return (
  //       <View
  //         style={{
  //           width: 15,
  //           height: 3,
  //           backgroundColor: props.active ? "red" : "gray",
  //         }}
  //       />
  //     );
  //   };

  const renderRecommendedCarouselItem = (itemData) => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "white" }}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: "hidden",
            marginRight: 5,
          }}
        >
          <Image
            style={{
              width: DeviceDimensions.width / 3.114,
              height: DeviceDimensions.height / 3.807,
            }}
            source={{ uri: itemData.item.thumbnail.imageUrl }}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontFamily: "helvetica-light", fontSize: 18 }}>
            {itemData.item.title}
          </Text>
          {/* <View
            style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          > */}
          <Rating
            style={{ alignItems: "flex-start", marginVertical: 5 }}
            readonly={true}
            startingValue={itemData.item.rating.average}
            fractions={1}
            imageSize={25}
          />
          {/* </View> */}
          <BodyText numberOfLines={11} style={{ width: 170, color: "#cccccc" }}>
            {itemData.item.description}
          </BodyText>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        activeSlideAlignment="start"
        sliderWidth={DeviceDimensions.width}
        itemWidth={DeviceDimensions.width - 60}
        data={slicedRecommendedProducts}
        renderItem={renderRecommendedCarouselItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        inactiveSlideOpacity={0.4}
      />
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={slicedRecommendedProducts.length}
        dotColor={Colors.primary}
        inactiveDotColor={Colors.inactive_grey}
        inactiveDotScale={1}
        activeOpacity={0.5}
        tappableDots={true}
        carouselRef={carouselRef}
        containerStyle={{
          marginTop: -2,
        }}
        dotContainerStyle={{
          marginHorizontal: 5,
        }}
        dotStyle={{
          width: 35,
          height: 5,
          borderRadius: 2,
        }}
      />
    </View>
  );
};

export default RecommendedCarousel;
