import React from "react";
import { View, Text } from "react-native";

import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from "rn-placeholder";

const SkeletonAccountScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
        padding: 20,
      }}
    >
      <Placeholder Animation={Fade}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PlaceholderLine style={{ marginTop: 14 }} height={36} width={60} />
          <PlaceholderMedia
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              overflow: "hidden",
            }}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <PlaceholderLine width={30} height={14} />
          <PlaceholderLine width={50} height={14} />
        </View>
        <View style={{ marginHorizontal: -20, paddingTop: 30 }}>
          <PlaceholderLine height={35} />
        </View>
        <PlaceholderLine width={30} height={18} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <PlaceholderMedia
            style={{
              width: 107.58,
              height: 148.52,
            }}
          />
          <PlaceholderMedia
            style={{
              width: 107.58,
              height: 148.52,
            }}
          />
          <PlaceholderMedia
            style={{
              width: 107.58,
              height: 148.52,
            }}
          />
        </View>
        <PlaceholderLine width={30} height={18} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PlaceholderMedia
            style={{
              width: 166.365,
              height: 255.093,
            }}
          />
          <PlaceholderMedia
            style={{
              width: 166.365,
              height: 255.093,
              marginTop: 40,
            }}
          />
        </View>
      </Placeholder>
    </View>
  );
};

export default SkeletonAccountScreen;
