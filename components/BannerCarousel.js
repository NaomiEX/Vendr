import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

const BannerCarousel = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = (itemData) => {
    return (
      <View>
        <ImageBackground
          style={{
            width: DeviceDimensions.width,
            height: DeviceDimensions.height / 2.812,
          }}
          source={itemData.item.imageUrl}
        >
          <TouchableNativeFeedback
            useForeground={true}
            style={{ flex: 1 }}
            onPress={() => {
              // console.log(itemData.item.id);
              props.onPress(itemData.item.id, {
                headerBackground: itemData.item.headerBackground,
                headerIcon: itemData.item.headerIcon,
                headerSubtitle: itemData.item.headerSubtitle,
                headerText: itemData.item.headerText,
                headerSubtitleWidth: itemData.item.headerSubtitleWidth,
              });
            }}
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
          </TouchableNativeFeedback>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.carousel}>
        <Carousel
          data={props.data}
          renderItem={renderCarouselItem}
          sliderWidth={DeviceDimensions.width}
          itemWidth={DeviceDimensions.width}
          lockScrollWhileSnapping={props.autoplay ? true : false}
          autoplay={props.autoplay}
          autoplayInterval={5000}
          loop={props.autoplay ? true : false}
          onSnapToItem={(index) => setActiveSlide(index)}
          slideStyle={{ width: DeviceDimensions.width }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
      </View>
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={activeSlide}
        dotColor={Colors.primary}
        inactiveDotColor="#000000"
        inactiveDotScale={0.9}
        inactiveDotOpacity={0.2}
        dotStyle={{
          width: 15,
          height: 2,
          borderRadius: 0,
        }}
        dotContainerStyle={{ marginHorizontal: 4 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginBottom: -DeviceDimensions.height / 37.964,
  },

  textContainer: {
    marginBottom: 25,
    marginLeft: DeviceDimensions.width / 78.546,
  },
});

export default BannerCarousel;
