import React from "react";
import { View, Text } from "react-native";

import {
  PlaceholderMedia,
  PlaceholderLine,
  Placeholder,
  Fade,
} from "rn-placeholder";

import DeviceDimensions from "../../constants/DeviceDimensions";

const SkeletonSaleProduct = (props) => {
  return (
    <Placeholder Animation={Fade}>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <PlaceholderMedia
          style={{
            width: DeviceDimensions.width / 2.9091,
            height: DeviceDimensions.height / 3.66799,
          }}
        />
        <View style={{ marginLeft: 20, flex: 1 }}>
          <PlaceholderLine width={91} height={18} />
          <PlaceholderLine width={50} height={20} />
          <PlaceholderMedia
            style={{ width: 180, height: 80, marginBottom: 30 }}
          />
          <PlaceholderLine width={80} height={20} />
        </View>
      </View>
    </Placeholder>
  );
};

export default SkeletonSaleProduct;
