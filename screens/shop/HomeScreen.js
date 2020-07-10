import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useIsDrawerOpen } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSafeArea } from "react-native-safe-area-context";
import moment from "moment";
import * as firebase from "firebase";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import BannerCarousel from "../../components/BannerCarousel";
import SearchBar from "../../components/SearchBar";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import BubbleIconRow from "../../components/BubbleIconRow";
import PopularProductsRow from "../../components/PopularProductsRow";
import RecommendedProductsRow from "../../components/RecommendedProductsRow";
import BodyText from "../../components/Text/BodyText";
import SmallBanners from "../../components/UI/SmallBanners";
import RecommendedCarousel from "../../components/RecommendedCarousel";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import { LARGE_BANNERS } from "../../data/large_banners";
import { CATEGORIES } from "../../data/categories";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as otherProfilesActions from "../../store/actions/otherUserProfiles";
import * as wishlistActions from "../../store/actions/wishlist";
import * as productActions from "../../store/actions/products";
import * as addressesActions from "../../store/actions/addresses";
import * as userProfileActions from "../../store/actions/userProfile";

const HomeScreen = (props) => {
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transparent, setTransparent] = useState(true);

  const dispatch = useDispatch();
  const isDrawerOpen = useIsDrawerOpen();

  const navigateToCategory = (categoryName, categoryColor) => {
    props.navigation.navigate("Category", {
      title: categoryName,
      categoryColor: categoryColor,
    });
  };

  const { navigation, route } = props;

  const token = useSelector((state) => state.authentication.token);
  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener("focus", async () => {
      // setIsLoading(true);
      await dispatch(activeComponentsActions.updateActiveScreen("Home", "top"));
      setIsHomeScreenActive(true);
      await dispatch(productActions.fetchProducts());
      await dispatch(wishlistActions.fetchWishlist());
      dispatch(userProfileActions.getProfile(token));
      dispatch(userProfileActions.getProfileDetails());
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
  const onPressSeeMoreHandler = (type, products) => {
    props.navigation.navigate("Products", {
      type,
      products,
    });
  };

  const BANNER_HEIGHT = DeviceDimensions.height / 2.812;
  const safeArea = useSafeArea();
  const HEADER_HEIGHT = DeviceDimensions.height / 9.86;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!scrollY) {
      return;
    }
    const listenerId = scrollY.addListener((a) => {
      const topNaviOffset = BANNER_HEIGHT - HEADER_HEIGHT - safeArea.top;
      // if (transparent && a.value > topNaviOffset) {
      //   setTransparent(false);
      // } else if (!transparent && a.value < topNaviOffset) {
      //   setTransparent(true);
      // }
      transparent !== a.value < topNaviOffset && setTransparent(!transparent);
    });
    return () => scrollY.removeListener(listenerId);
  });

  // console.log(moment().format("DD/MM/YYYY-hh:mm a"));

  props.navigation.setOptions({
    headerTransparent: true,
    headerBackground: () => (
      <View
        style={{
          flex: 1,
          backgroundColor: transparent
            ? "rgba(0,0,0,0)"
            : "rgba(255,255,255,1)",
        }}
      ></View>
    ),
    headerTitle: () => (
      <SearchBar
        barStyle={{
          color: transparent
            ? Colors.translucent_white
            : Colors.translucent_grey,
        }}
        onPress={() => {
          props.navigation.navigate("Search");
        }}
      />
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          color={transparent ? Colors.translucent_white : Colors.inactive_grey}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
          color={transparent ? Colors.translucent_white : Colors.inactive_grey}
        />
      </HeaderButtons>
    ),
  });

  return (
    <Animated.ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      style={styles.screen}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        { useNativeDriver: true }
      )}
    >
      <View>
        <StatusBar
          barStyle={
            isHomeScreenActive
              ? transparent
                ? "light-content"
                : "dark-content"
              : "dark-content"
          }
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

          <CategoryHeaderText style={{ marginBottom: 20, marginTop: 30 }}>
            Popular
          </CategoryHeaderText>
          <PopularProductsRow
            products={allProducts}
            onPressProduct={onPressProductHandler}
            onPressSeeMore={onPressSeeMoreHandler}
          />
          <CategoryHeaderText style={{ marginTop: 30, marginBottom: 20 }}>
            Recommended
          </CategoryHeaderText>
          <View>
            <RecommendedCarousel
              products={allProducts}
              onPressProduct={onPressProductHandler}
            />
          </View>
          <CategoryHeaderText style={{ marginTop: 10 }}>
            Hot Sales
          </CategoryHeaderText>
          <SmallBanners />
        </View>
      </View>
    </Animated.ScrollView>
  );
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
