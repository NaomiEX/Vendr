import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import Screen from "../../components/UI/BasicScreen";

import { CATEGORIES } from "../../data/categories";

let leftArray = [];
let rightArray = [];

for (const key in CATEGORIES) {
  if (key % 2 === 0) {
    leftArray.push(CATEGORIES[key]);
  } else {
    rightArray.push(CATEGORIES[key]);
  }
}

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const CategoriesOverviewScreen = (props) => {
  const renderFlatlistItem = (itemData) => {
    return (
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          elevation: 5,
          marginBottom: 20,
          backgroundColor: "white",
        }}
        key={itemData.id}
      >
        <TouchableComponent
          useForeground={true}
          onPress={() => {
            props.navigation.navigate("Category", {
              title: itemData.title,
              categoryColor: itemData.color,
            });
          }}
        >
          <View>
            <ImageBackground
              style={{
                width: DeviceDimensions.width / 2.157,
                height: DeviceDimensions.height / 2.447,
              }}
              source={itemData.imageUrl}
            >
              <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                <TitleText
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: 150.5,
                  }}
                >
                  {itemData.title}
                </TitleText>
              </View>
            </ImageBackground>
          </View>
        </TouchableComponent>
      </View>
    );
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Screen>
        <View>
          <View
            style={{
              alignItems: "center",
              marginTop: props.route.params ? 10 : 60,
            }}
          >
            <TitleText style={{ color: Colors.primary }}>
              All Categories
            </TitleText>
            <Divider dividerStyle={{ width: 40, height: 2, marginTop: 10 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: DeviceDimensions.width / 41.1,
            }}
          >
            <View style={{ marginTop: 30 }}>
              {leftArray.map((category) => renderFlatlistItem(category))}
            </View>
            <View
              style={{
                marginTop: 90,
                marginLeft: DeviceDimensions.width / 41.1,
              }}
            >
              {rightArray.map((category) => renderFlatlistItem(category))}
            </View>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({});

export default CategoriesOverviewScreen;
