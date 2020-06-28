import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Chip from "./UI/Chip";

const ChipRow = (props) => {
  const renderChipItem = (itemData) => {
    return (
      <View style={styles.chipItem}>
        <Chip>{itemData.item.title}</Chip>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={renderChipItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chipItem: {
    marginRight: 5,
  },
});

export default ChipRow;
