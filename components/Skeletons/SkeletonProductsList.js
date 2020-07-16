import React from "react";
import { View, StyleSheet } from "react-native";

import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";

const SkeletonProductsList = (props) => {
  return (
    <Placeholder Animation={Fade}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <PlaceholderMedia style={styles.productSkeleton} />
          <PlaceholderMedia style={styles.productSkeleton} />
        </View>
        <View style={{ marginTop: 40 }}>
          <PlaceholderMedia style={styles.productSkeleton} />
          <PlaceholderMedia style={styles.productSkeleton} />
        </View>
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  productSkeleton: {
    width: 166.365,
    height: 255.093,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 30,
  },
});

export default SkeletonProductsList;
