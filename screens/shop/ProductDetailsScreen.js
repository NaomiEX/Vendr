import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Pagination } from "react-native-snap-carousel";

import Screen from "../../components/UI/BasicScreen";
import ImageCarousel from "../../components/GeneralCarousel";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

const data = [
  require("../../assets/black_headphones.jpg"),
  require("../../assets/Take_A_Picture.png"),
  require("../../assets/black_headphones.jpg"),
];

const ProductDetailsScreen = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Screen>
      <ImageCarousel
        data={data}
        onSnapToItem={(index) => {
          setActiveSlide(index);
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginTop: -30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <View style={{ marginTop: -10 }}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            dotColor={Colors.primary}
            inactiveDotColor={Colors.inactive_grey}
            inactiveDotOpacity={0.5}
            inactiveDotScale={0.8}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
            }}
            dotContainerStyle={{
              marginHorizontal: 4,
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = (navData) => {
  return {
    headerTransparent: true,
    headerBackground: () => <View></View>,
    headerTitle: null,
  };
};

export default ProductDetailsScreen;
