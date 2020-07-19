import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
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

  const comparePopularity = (a, b) => {
    let comparison = 0;
    if (a.views.totalViews > b.views.totalViews) {
      comparison = -1;
    } else if (a.views.totalViews < b.views.totalViews) {
      comparison = 1;
    }
    return comparison;
  };

  // console.log("SORTTTTTTTTTTT");
  let finalProducts = props.products.sort(comparePopularity);

  let recommendedProducts = [];
  for (const key in sortedProducts) {
    for (const index in finalProducts) {
      for (const categoryIndex in sortedProducts[key].categories) {
        if (
          finalProducts[index].categories.includes(
            sortedProducts[key].categories[categoryIndex]
          ) &&
          !recommendedProducts.includes(finalProducts[index])
        ) {
          recommendedProducts.push(finalProducts[index]);
        }
      }
    }
  }

  const slicedRecommendedProducts = recommendedProducts.slice(0, 5);

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const renderRecommendedCarouselItem = (itemData) => {
    return (
      <View
        style={{
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "white",
          margin: 5,
        }}
      >
        <TouchableComponent
          style={{ flex: 1 }}
          useForeground={true}
          onPress={props.onPressProduct.bind(this, itemData.item.id)}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
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
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: "helvetica-light",
                  fontSize: 18,
                  marginTop: 10,
                  width: 170,
                }}
              >
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
              <BodyText
                numberOfLines={8}
                style={{ width: 170, color: "#cccccc" }}
              >
                {itemData.item.description}
              </BodyText>
            </View>
          </View>
        </TouchableComponent>
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
        data={
          filteredProducts.length > 0
            ? slicedRecommendedProducts
            : props.products.slice(0, 5)
        }
        renderItem={renderRecommendedCarouselItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        inactiveSlideOpacity={0.4}
        loop={true}
      />
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={
          filteredProducts.length > 0 ? slicedRecommendedProducts.length : 5
        }
        dotColor={Colors.primary}
        inactiveDotColor={Colors.inactive_grey}
        inactiveDotScale={0.9}
        activeOpacity={0.5}
        tappableDots={true}
        carouselRef={carouselRef}
        containerStyle={{
          marginTop: -4,
        }}
        dotContainerStyle={{
          marginHorizontal: 4,
        }}
        dotStyle={{
          width: 15,
          height: 2,
          borderRadius: 0,
        }}
      />
    </View>
  );
};

export default RecommendedCarousel;
