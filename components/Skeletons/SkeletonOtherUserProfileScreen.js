import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from "rn-placeholder";

import Screen from "../UI/BasicScreen";
import SkeletonProductsList from "./SkeletonProductsList";

import DeviceDimensions from "../../constants/DeviceDimensions";

const SkeletonOtherUserProfileScreen = (props) => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View>
        <Placeholder Animation={Fade}>
          <View style={{ alignItems: "center" }}>
            <PlaceholderMedia style={styles.profilePicture} />
            <PlaceholderLine style={{ marginTop: 20 }} height={24} width={40} />
            <PlaceholderLine style={{ marginTop: -5 }} height={12} width={30} />
            <PlaceholderLine height={12} width={35} />
            <PlaceholderMedia style={styles.statistics} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <PlaceholderLine style={{ marginTop: 40 }} height={18} width={40} />
            <PlaceholderLine style={{ marginTop: 0 }} height={12} width={100} />
            <PlaceholderLine style={{ marginTop: 40 }} height={18} width={40} />
            <PlaceholderLine style={{ marginTop: 0 }} height={12} width={60} />
            <PlaceholderLine style={{ marginTop: 40 }} height={18} width={40} />
            <PlaceholderMedia
              style={{ width: DeviceDimensions.width - 40, height: 120 }}
            />
            <PlaceholderLine style={{ marginTop: 20 }} height={16} width={30} />
            <PlaceholderLine style={{ marginTop: 40 }} height={18} width={40} />
          </View>
          <SkeletonProductsList />
        </Placeholder>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginTop: 10,
  },

  statistics: {
    width: DeviceDimensions.width,
    height: 50,
    marginTop: 50,
  },
});

export default SkeletonOtherUserProfileScreen;
