import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const renderCarouselItem = (itemData) => {
  console.log(deviceWidth);
  console.log(deviceHeight);
  return (
    <View>
      <ImageBackground
        style={{
          width: deviceWidth,
          height: deviceHeight / 2.812,
        }}
        source={itemData.item.imageUrl}
      >
        <LinearGradient
          style={{ flex: 1, justifyContent: "flex-end" }}
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
          start={[0.5, 0.2]}
          end={[0.5, 0.4]}
        >
          <View style={styles.textContainer}>
            <Image source={itemData.item.imageTextUrl} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const ShopCarousel = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View>
      <View style={styles.carousel}>
        <Carousel
          data={props.data}
          renderItem={renderCarouselItem}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          lockScrollWhileSnapping={props.autoplay ? true : false}
          autoplay={props.autoplay}
          autoplayInterval={5000}
          loop={props.autoplay ? true : false}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      </View>
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={activeSlide}
        dotColor={Colors.primary}
        inactiveDotColor="#000000"
        inactiveDotScale={0.8}
        inactiveDotOpacity={0.2}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        dotContainerStyle={{ marginHorizontal: 2 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginBottom: -deviceHeight / 37.964,
  },

  textContainer: {
    marginBottom: 25,
    marginLeft: deviceWidth / 78.546,
  },
});

export default ShopCarousel;
