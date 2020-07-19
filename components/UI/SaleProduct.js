import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from "react-native";

import BodyText from "../../components/Text/BodyText";

import DeviceDimensions from "../../constants/DeviceDimensions";
import Colors from "../../constants/Colors";

import { Rating } from "react-native-ratings";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SaleProduct = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPressProduct.bind(this, props.product.id)}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: DeviceDimensions.width / 2.9091,
            height: DeviceDimensions.height / 3.66799,
          }}
          source={{ uri: props.product.thumbnail.imageUrl }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text numberOfLines={3} style={styles.productTitle}>
            {props.product.title}
          </Text>
          <View style={{ alignItems: "flex-start", marginTop: 5 }}>
            <Rating
              readonly
              startingValue={props.product.rating.average}
              imageSize={20}
            />
          </View>
          <BodyText numberOfLines={4} style={styles.productDescription}>
            {props.product.description}
          </BodyText>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.previousPrice}>${props.previousPrice}</Text>
              <Text style={styles.price}>${props.product.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontFamily: "helvetica-light",
    fontSize: 18,
    color: Colors.black,
    width: DeviceDimensions.width / 1.9835,
  },

  productDescription: {
    color: Colors.inactive_grey,
    width: DeviceDimensions.width / 1.9835,
    marginTop: 10,
    lineHeight: 20,
  },

  previousPrice: {
    fontFamily: "helvetica-standard",
    fontSize: 12,
    color: Colors.translucent_grey,
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 20,
    fontFamily: "helvetica-bold",
    color: Colors.black,
    marginLeft: 20,
  },
});

export default SaleProduct;
