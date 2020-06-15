import React, { useState } from "react";
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

const initialLayout = { width: DeviceDimensions.width };

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}
const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={Colors.accent}
    inactiveColor={Colors.inactive_grey}
    indicatorStyle={{ backgroundColor: Colors.accent }}
    renderLabel={({ route, focused, color }) => (
      <CategoryHeaderText style={{ color }}>{route.title}</CategoryHeaderText>
    )}
    style={{ backgroundColor: "white" }}
  />
);

const Tab = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: props.title[0] },
    { key: "second", title: props.title[1] },
  ]);

  const BuyerScreen = () => (
    <View>
      <Text>Buyer Screen</Text>
    </View>
  );

  const SellerScreen = () => (
    <View>
      <Text>Seller Screen</Text>
      <View style={styles.addButton}>
        <BubbleIcon
          onClick={props.onTap}
          iconBackgroundColor={Colors.accent}
          icon={require("../assets/icons/plus.png")}
        />
      </View>
    </View>
  );

  const renderScene = SceneMap({
    first: props.account ? BuyerScreen : null,
    second: props.account ? SellerScreen : null,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => setIndex(index)}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    top: 400,
    right: 20,
  },
});

export default Tab;
