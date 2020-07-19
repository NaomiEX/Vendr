import React from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import DeviceDimensions from "../../constants/DeviceDimensions";

import { SMALL_BANNERS } from "../../data/small_banner";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const SmallBanner = (props) => {
  const renderSmallBannerItem = (banner) => {
    // console.log(banner);

    return (
      <View
        style={{
          marginRight: 20,
          marginTop: 20,
          borderRadius: 5,
          overflow: "hidden",
        }}
        key={banner.id}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: 87,
          }}
          source={banner.image}
        >
          <TouchableComponent
            useForeground={true}
            onPress={props.onPress.bind(this, banner.id, {
              headerBackground: banner.headerBackground,
              headerIcon: banner.headerIcon,
              headerSubtitle: banner.headerSubtitle,
              headerSubtitleWidth: banner.headerSubtitleWidth,
              headerText: banner.headerText,
            })}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image style={{ marginLeft: 15 }} source={banner.text} />
            </View>
          </TouchableComponent>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View>{SMALL_BANNERS.map((banner) => renderSmallBannerItem(banner))}</View>
  );
};

export default SmallBanner;
