import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useIsDrawerOpen } from "@react-navigation/drawer";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import BannerCarousel from "../../components/BannerCarousel";
import SearchBar from "../../components/SearchBar";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import BubbleIconRow from "../../components/BubbleIconRow";
import PopularProductsRow from "../../components/PopularProductsRow";
import RecommendedProductsRow from "../../components/RecommendedProductsRow";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import { LARGE_BANNERS } from "../../data/large_banners";
import { CATEGORIES } from "../../data/categories";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as otherProfilesActions from "../../store/actions/otherUserProfiles";
import * as wishlistActions from "../../store/actions/wishlist";
import * as productActions from "../../store/actions/products";
import BodyText from "../../components/Text/BodyText";

const HomeScreen = (props) => {
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const isDrawerOpen = useIsDrawerOpen();

  const navigateToCategory = (categoryName, categoryColor) => {
    props.navigation.navigate("Category", {
      title: categoryName,
      categoryColor: categoryColor,
    });
  };

  const { navigation, route } = props;

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener("focus", async () => {
      // setIsLoading(true);
      await dispatch(activeComponentsActions.updateActiveScreen("Home", "top"));
      setIsHomeScreenActive(true);
      await dispatch(productActions.fetchProducts());
      await dispatch(wishlistActions.fetchWishlist());
      // setIsLoading(false);
    });

    const unsubscribeBlur = props.navigation.addListener("blur", () => {
      setIsHomeScreenActive(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const allProducts = useSelector((state) => state.products.availableProducts);

  useEffect(() => {
    route.params &&
      ToastAndroid.showWithGravityAndOffset(
        route.params.toastText,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        160
      );
  }, [route]);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: isLoading ? false : true,
    });
  }, [isLoading]);

  useEffect(() => {
    dispatch(activeComponentsActions.updateActiveDrawer(isDrawerOpen));
  }, [isDrawerOpen]);

  const onPressProductHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  // if (isLoading) {
  //   return (
  //     <Screen style={{ justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </Screen>
  //   );
  // }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      style={styles.screen}
    >
      <View>
        <StatusBar
          barStyle={isHomeScreenActive ? "light-content" : "dark-content"}
          translucent={true}
          backgroundColor="rgba(0,0,0,0)"
        />
        <BannerCarousel data={LARGE_BANNERS} autoplay={true} />
        <View style={styles.body}>
          <CategoryHeaderText style={{ marginBottom: 5 }}>
            Categories
          </CategoryHeaderText>
          <BubbleIconRow data={CATEGORIES} onTap={navigateToCategory} />
          <TouchableOpacity
            style={{ ...styles.seeMore, marginTop: 5 }}
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("Categories Overview", {
                navigatedFromOtherPage: true,
              });
            }}
          >
            <BodyText style={{ color: Colors.accent }}>
              See all categories
            </BodyText>
            <Image source={require("../../assets/icons/yellow_arrow.png")} />
          </TouchableOpacity>
          <CategoryHeaderText style={styles.headerText}>
            Recommended
          </CategoryHeaderText>

          <RecommendedProductsRow
            products={allProducts}
            onPressProduct={onPressProductHandler}
          />
          <TouchableOpacity
            style={{ ...styles.seeMore, marginTop: 15 }}
            activeOpacity={0.6}
            onPress={() => {
              console.log("go to all recommended products screen");
            }}
          >
            <BodyText style={{ color: Colors.accent }}>
              See all recommended products
            </BodyText>
            <Image source={require("../../assets/icons/yellow_arrow.png")} />
          </TouchableOpacity>
          <CategoryHeaderText style={styles.headerText}>
            Popular
          </CategoryHeaderText>
          <PopularProductsRow
            products={allProducts}
            onPressProduct={onPressProductHandler}
          />
          <TouchableOpacity
            style={{ ...styles.seeMore, marginTop: 15 }}
            activeOpacity={0.6}
            onPress={() => {
              console.log("Go to all popular products screen");
            }}
          >
            <BodyText style={{ color: Colors.accent }}>
              See all popular products
            </BodyText>
            <Image source={require("../../assets/icons/yellow_arrow.png")} />
          </TouchableOpacity>
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
          color={Colors.translucent_white}
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
          color={Colors.translucent_white}
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
    marginBottom: 20,
    marginTop: 20,
  },

  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },
});

export default HomeScreen;
