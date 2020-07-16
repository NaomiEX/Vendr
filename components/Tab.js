import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import CategoryHeaderText from "../components/Text/CategoryHeaderText";

import DeviceDimensions from "../constants/DeviceDimensions";
import Colors from "../constants/Colors";
import BubbleIcon from "../components/UI/BubbleIcon";
import AccountBuyerScreen from "../components/AccountBuyerScreen";
import AccountSellerScreen from "../components/AccountSellerScreen";

const initialLayout = { width: DeviceDimensions.width };

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const Tab = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: props.title[0] },
    { key: "second", title: props.title[1] },
  ]);

  useEffect(() => {
    props.changeIndex(index);
  }, [index]);

  const BuyerScreen = () => (
    <AccountBuyerScreen navigation={props.navigation} />
  );

  const SellerScreen = () => (
    <AccountSellerScreen
      navigation={props.navigation}
      onTapButton={props.onTap}
    />
  );

  const renderScene = SceneMap({
    first: props.account ? BuyerScreen : null,
    second: props.account ? SellerScreen : null,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        activeColor={index === 0 ? Colors.primary : "#4DD599"}
        inactiveColor={Colors.inactive_grey}
        indicatorStyle={{
          backgroundColor: index === 0 ? Colors.primary : "#4DD599",
        }}
        renderLabel={({ route, focused, color }) => (
          <CategoryHeaderText style={{ color }}>
            {route.title}
          </CategoryHeaderText>
        )}
        style={{ backgroundColor: "white" }}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => setIndex(index)}
      initialLayout={initialLayout}
      index={index}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({});

export default Tab;
