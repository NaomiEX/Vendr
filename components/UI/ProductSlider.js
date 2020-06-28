import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import CategoryHeaderText from "../Text/CategoryHeaderText";
import ProductItem from "../UI/ProductItem";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const renderFlatlistItem = (onTap, itemData) => {
  let rating;
  // console.log("Rating: ");
  // console.log(itemData.item.rating);

  return (
    // <View style={styles.cardContainer}>
    //   <TouchableComponent
    //     style={{ width: 150, height: 217.5 }}
    //     useForeground={true}
    //     onPress={onTap.bind(this, itemData.item.id)}
    //   >
    //     <View style={styles.card}>
    //       <ImageBackground
    //         style={{ width: 150, height: 217.5, backgroundColor: "#cccccc" }}
    //         source={{ uri: itemData.item.thumbnail.imageUrl }}
    //       >
    //         <LinearGradient
    //           style={{ flex: 1 }}
    //           colors={["rgba(0,0,0,1)", "rgba(196,196,196,0)"]}
    //           start={[0.5, 1]}
    //           end={[0.5, 0]}
    //         >
    //           <View style={styles.textContainer}>
    //             <Text style={{ ...styles.text, ...styles.title }}>
    //               {itemData.item.title}
    //             </Text>
    //             <View
    //               style={{
    //                 flexDirection: "row",
    //                 justifyContent: "space-between",
    //               }}
    //             >
    //               <Text style={{ ...styles.text, ...styles.price }}>
    //                 ${itemData.item.price}
    //               </Text>
    //               <View style={{ flexDirection: "row" }}>
    //                 <Image
    //                   style={styles.star}
    //                   source={require("../../assets/icons/star.png")}
    //                 />
    //                 <Text style={{ ...styles.text, ...styles.rating }}>
    //                   {itemData.item.rating.average
    //                     ? itemData.item.rating.average
    //                     : 0}
    //                 </Text>
    //               </View>
    //             </View>
    //           </View>
    //         </LinearGradient>
    //       </ImageBackground>
    //     </View>
    //   </TouchableComponent>
    // </View>
    <ProductItem
      style={{
        width: 150,
        height: 217.5,
      }}
      cardContainerStyle={{
        borderRadius: 20,
        marginRight: 20,
      }}
      onTap={onTap}
      id={itemData.item.id}
      thumbnail={itemData.item.thumbnail}
      title={itemData.item.title}
      price={itemData.item.price}
      rating={itemData.item.rating}
    />
  );
};

const ProductSlider = (props) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={props.data}
        renderItem={renderFlatlistItem.bind(this, props.onTap)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
  },

  card: {
    borderRadius: 20,
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
    marginBottom: 5,
  },

  text: {
    fontSize: 22,
    fontFamily: "helvetica-standard",
    color: "white",
  },

  star: { width: 20, height: 20, marginTop: 8, marginRight: 5 },

  price: {
    letterSpacing: 1.5,
    width: 90,
  },
});

export default ProductSlider;
