import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { Rating, AirbnbRating } from "react-native-ratings";

import BodyText from "../../components/Text/BodyText";

import Colors from "../../constants/Colors";

const RatingModal = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [ratings, setRatings] = useState([]);

  const onPressDoneHandler = () => {
    // console.log("HEY");
    let valid = true;
    for (const key in props.products) {
      if (
        ratings.filter((item) => item.product.id === props.products[key].id)
          .length === 0
      ) {
        valid = false;
      }
    }

    if (!valid) {
      Alert.alert("Rating incomplete", "Please rate all the products!", [
        { text: "Ok" },
      ]);
    } else {
      props.storeRatings(ratings);
    }
  };

  const renderRateProductItem = (itemData) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            style={{ width: 60, height: 92 }}
            source={{ uri: itemData.item.thumbnail.imageUrl }}
          />
          <Text
            numberOfLines={4}
            style={{
              width: 148,
              marginLeft: 10,
              fontSize: 18,
              color: Colors.black,
              fontFamily: "helvetica-light",
            }}
          >
            {itemData.item.title}
          </Text>
        </View>
        <AirbnbRating
          size={20}
          defaultRating={0}
          selectedColor={Colors.accent}
          reviewSize={20}
          showRating={false}
          onFinishRating={(rating) => {
            // console.log(rating);

            if (ratings.length === 0) {
              setRatings([{ product: itemData.item, rating }]);
            } else {
              for (const key in ratings) {
                if (ratings[key].product.id === itemData.item.id) {
                  setRatings((ratings) => [
                    ...ratings.filter(
                      (rating) => rating.product.id !== itemData.item.id
                    ),
                    { product: itemData.item, rating },
                  ]);
                  return;
                } else {
                  setRatings((ratings) => [
                    ...ratings,
                    { product: itemData.item, rating },
                  ]);
                }
              }
            }
          }}
        />
      </View>
    );
  };

  // console.log("RATINGS: ");
  // console.log(ratings);

  return (
    <Modal transparent animationType="fade" visible={props.showModal}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            backgroundColor: "white",
            height: props.products.length > 1 ? 380 : 360,
            marginHorizontal: 40,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity activeOpacity={0.6} onPress={props.hideModal}>
            <Image source={require("../../assets/icons/gray_cross.png")} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "helvetica-light",
              fontSize: 18,
              color: Colors.black,
              textAlign: "center",
              marginBottom: 30,
              marginTop: 10,
              letterSpacing: 1,
            }}
          >
            Would you like to rate this product?
          </Text>
          {/* <FlatList data={props.products} renderItem={renderRateProductItem} /> */}
          <Carousel
            data={props.products}
            renderItem={renderRateProductItem}
            sliderWidth={272.73}
            itemWidth={272.73}
            onSnapToItem={(index) => setActiveSlide(index)}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
          <Pagination
            dotsLength={props.products.length}
            activeDotIndex={activeSlide}
            dotColor={Colors.accent}
            inactiveDotColor="#000000"
            inactiveDotScale={0.9}
            inactiveDotOpacity={0.2}
            dotStyle={{
              width: 6,
              height: 6,
              borderRadius: 3,
            }}
            dotContainerStyle={{
              marginHorizontal: 3,
              marginTop: -5,
            }}
          />
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressDoneHandler}>
              <Text style={{ ...styles.actionText, color: Colors.accent }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionText: {
    fontFamily: "helvetica-standard",
    fontSize: 18,
    paddingBottom: 20,
  },
});

export default RatingModal;
