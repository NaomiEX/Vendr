import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useIsDrawerOpen } from "@react-navigation/drawer";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import BannerCarousel from "../../components/BannerCarousel";
import SearchBar from "../../components/SearchBar";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import BubbleIconRow from "../../components/BubbleIconRow";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import { LARGE_BANNERS } from "../../data/large_banners";
import { CATEGORIES } from "../../data/categories";

import * as activeComponentsActions from "../../store/actions/activeComponents";

const HomeScreen = (props) => {
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true);
  const dispatch = useDispatch();

  const isDrawerOpen = useIsDrawerOpen();

  const navigateToCategory = (categoryName) => {
    props.navigation.navigate("Category", { title: categoryName });
  };

  const { navigation } = props;

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener("focus", () => {
      dispatch(activeComponentsActions.updateActiveScreen("Home"));
      setIsHomeScreenActive(true);
    });

    const unsubscribeBlur = props.navigation.addListener("blur", () => {
      setIsHomeScreenActive(false);
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  useEffect(() => {
    dispatch(activeComponentsActions.updateActiveDrawer(isDrawerOpen));
  }, [isDrawerOpen]);

  return (
    <ScrollView style={styles.screen}>
      <View>
        <StatusBar
          barStyle={isHomeScreenActive ? "light-content" : "dark-content"}
          translucent={true}
          backgroundColor="rgba(0,0,0,0)"
        />
        <BannerCarousel data={LARGE_BANNERS} autoplay={true} />
        <View style={styles.body}>
          <CategoryHeaderText style={styles.headerText}>
            Categories
          </CategoryHeaderText>
          <BubbleIconRow data={CATEGORIES} onTap={navigateToCategory} />
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTransparent: true,
    headerBackground: () => <View></View>,
    headerTitle: () => (
      <SearchBar
        onPress={() => {
          navData.navigation.navigate("Search");
        }}
      />
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          translucentBackground
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          translucentBackground
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  body: {
    marginLeft: DeviceDimensions.width / 19.64,
    marginTop: -DeviceDimensions.height / 75.93,
  },

  headerText: {
    marginBottom: 5,
  },
});

export default HomeScreen;
