import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import BubbleIcon from "./UI/BubbleIcon";

import DeviceDimensions from "../constants/DeviceDimensions";

const renderBubbleIconRow = (props, itemData) => {
  return (
    <View style={styles.rowItem}>
      <BubbleIcon
        icon={itemData.item.icon}
        title={itemData.item.title}
        onClick={props.onTap.bind(
          this,
          itemData.item.title,
          itemData.item.color
        )}
        iconBackgroundColor="#ffffff"
      />
    </View>
  );
};

const BubbleIconRow = (props) => {
  console.log(DeviceDimensions);
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={renderBubbleIconRow.bind(this, props)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    marginRight: DeviceDimensions.width / 39.27,
    marginLeft: DeviceDimensions.width / 39.27,
    marginVertical: DeviceDimensions.height / 151.85,
  },
});

export default BubbleIconRow;
