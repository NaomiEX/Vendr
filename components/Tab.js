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

import DeviceDimensions from "../constants/DeviceDimensions";
import Colors from "../constants/Colors";
import BubbleIcon from "../components/UI/BubbleIcon";

const initialLayout = { width: DeviceDimensions.width };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={Colors.accent}
    inactiveColor="rgba(0,0,0,0.3)"
    indicatorStyle={{ backgroundColor: Colors.accent }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ ...styles.tabBarTitle, color }}>{route.title}</Text>
    )}
    style={{ backgroundColor: "white" }}
  />
);

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
  tabBarTitle: {
    fontSize: 18,
    fontFamily: "helvetica-bold",
  },

  addButton: {
    position: "absolute",
    top: 400,
    right: 20,
  },
});

export default Tab;
