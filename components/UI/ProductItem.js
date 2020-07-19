import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const ProductItem = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={
        props.cardContainerStyle
          ? { ...styles.cardContainer, ...props.cardContainerStyle }
          : styles.cardContainer
      }
    >
      <TouchableComponent
        style={{
          width: props.style ? props.style.width : 150,
          height: props.style ? props.style.height : 230,
        }}
        useForeground={true}
        onPress={props.onTap.bind(this, props.id)}
      >
        <View style={styles.card}>
          <ImageBackground
            // onLoad={() => {
            //   setIsLoading(false);
            // }}
            style={{
              width: props.style ? props.style.width : 150,
              height: props.style ? props.style.height : 230,
              backgroundColor: "#cccccc",
            }}
            source={{ uri: props.thumbnail.imageUrl }}
          >
            <LinearGradient
              style={{ flex: 1 }}
              colors={["rgba(0,0,0,1)", "rgba(196,196,196,0)"]}
              start={[0.5, 1]}
              end={[0.5, 0]}
            >
              <View style={styles.textContainer}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.text,
                    ...styles.title,
                    ...props.titleStyle,
                  }}
                >
                  {props.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ ...styles.text, ...styles.price }}>
                    ${props.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={styles.star}
                      source={require("../../assets/icons/star.png")}
                    />
                    <Text style={{ ...styles.text, ...styles.rating }}>
                      {props.rating.average ? props.rating.average : 0}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
    marginRight: 10,
    borderRadius: 5,
  },

  card: {
    borderRadius: 5,
    overflow: "hidden",
  },

  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 9,
    marginHorizontal: 8,
  },

  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "helvetica-light",
  },

  text: {
    fontSize: 20,
    fontFamily: "helvetica-standard",
    color: "white",
  },

  star: { width: 16, height: 16, marginTop: 8 },

  price: {
    letterSpacing: 1.5,
    width: 90,
  },

  rating: { fontSize: 20, marginLeft: 5 },
});

export default ProductItem;
