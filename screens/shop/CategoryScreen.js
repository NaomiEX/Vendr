import React from "react";
import { View, Text } from "react-native";

const CategoryScreen = (props) => {
  const categoryTitle = props.route.params.title;

  return (
    <View>
      <Text>{categoryTitle}</Text>
    </View>
  );
};

export default CategoryScreen;
