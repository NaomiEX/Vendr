import React from "react";
import { View, Text } from "react-native";

import Screen from "../../components/UI/BasicScreen";

const CategoryScreen = (props) => {
  const categoryTitle = props.route.params.title;

  return (
    <Screen>
      <Text>{categoryTitle}</Text>
    </Screen>
  );
};

export default CategoryScreen;
