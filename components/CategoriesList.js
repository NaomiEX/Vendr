import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";

import EmphasisText from "../components/Text/EmphasisText";

import { CATEGORIES } from "../data/categories";

const CategoriesList = (props) => {
  const [chosenCategories, setChosenCategories] = useState(props.initialValue);

  const renderCategoryListItem = (category) => {
    const isChosen = chosenCategories.includes(category.title);
    return (
      <View style={styles.categoryListItem} key={category.id}>
        <View style={styles.categoryRow}>
          <EmphasisText style={styles.categoryText}>
            {category.title}
          </EmphasisText>
          {isChosen ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChosenCategories(
                  chosenCategories.filter(
                    (categoryItem) => categoryItem !== category.title
                  )
                );
                props.onChooseCategoryHandler(category.title);
              }}
            >
              <Image
                source={require("../assets/icons/category_circle_filled.png")}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChosenCategories((categories) => [
                  ...categories,
                  category.title,
                ]);
                props.onChooseCategoryHandler(category.title);
              }}
            >
              <Image
                source={require("../assets/icons/category_circle_empty.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <Button
          title={isChosen ? "Chosen!" : "Press me!"}
          onPress={onChooseCategoryHandler.bind(this, category.title)}
        /> */}
      </View>
    );
  };
  return (
    <View>
      {CATEGORIES.map((category) => renderCategoryListItem(category))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryListItem: { marginBottom: 20, justifyContent: "center" },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categoryText: {
    color: "rgba(0,0,0,0.6)",
  },
});

export default CategoriesList;
