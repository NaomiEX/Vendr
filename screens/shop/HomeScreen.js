import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  Text,
  ActivityIndicator,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useIsDrawerOpen } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSafeArea } from "react-native-safe-area-context";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";
import * as firebase from "firebase";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import BannerCarousel from "../../components/BannerCarousel";
import SearchBar from "../../components/SearchBar";
import HeaderText from "../../components/Text/HeaderText";
import BubbleIconRow from "../../components/BubbleIconRow";
import PopularProductsRow from "../../components/PopularProductsRow";
import RecommendedProductsRow from "../../components/RecommendedProductsRow";
import BodyText from "../../components/Text/BodyText";
import SmallBanners from "../../components/UI/SmallBanners";
import RecommendedCarousel from "../../components/RecommendedCarousel";
import RatingModal from "../../components/UI/RatingModal";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";
import { LARGE_BANNERS } from "../../data/large_banners";
import { CATEGORIES } from "../../data/categories";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as wishlistActions from "../../store/actions/wishlist";
import * as productActions from "../../store/actions/products";
import * as userProfileActions from "../../store/actions/userProfile";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = (props) => {
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  console.log(DeviceDimensions);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await dispatch(productActions.fetchProducts());
      await dispatch(wishlistActions.fetchWishlist());
      setIsLoading(false);
    };

    getData();
  }, [dispatch, refreshing]);

  const allProducts = useSelector((state) => state.products.availableProducts);

  useEffect(() => {
    const orderedProducts = route.params && route.params.orderedProducts;
    // console.log("ORDERED PRODUCTS: ");
    // console.log(orderedProducts);
    orderedProducts && setShowModal(true);
  }, [route]);

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
    dispatch(activeComponentsActions.updateActiveDrawer(isDrawerOpen));
  }, [isDrawerOpen]);

  const onPressProductHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <Animated.ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

        <BannerCarousel
          navigation={props.navigation}
          data={LARGE_BANNERS}
          autoplay={true}
          onPress={(id, headerData) => {
            props.navigation.navigate("Sales", {
              id,
              headerData,
            });
          }}
        />
        <View style={styles.body}>
          <HeaderText style={{ marginBottom: 10 }}>Categories</HeaderText>
          <BubbleIconRow data={CATEGORIES} onTap={navigateToCategory} />
          <TouchableOpacity
            style={{ ...styles.seeMore, marginTop: 10 }}
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("Categories Overview", {
                navigatedFromOtherPage: true,
              });
            }}
          >
            <BodyText style={{ color: Colors.primary, marginRight: 5 }}>
              See all categories
            </BodyText>
            <Image source={require("../../assets/icons/Arrow_red.png")} />
          </TouchableOpacity>

          <HeaderText style={{ marginVertical: 30 }}>Popular</HeaderText>
          {isLoading ? (
            <Placeholder Animation={Fade}>
              <View style={{ flexDirection: "row" }}>
                <PlaceholderMedia
                  style={styles.popularProductsSliderSkeleton}
                />
                <PlaceholderMedia
                  style={styles.popularProductsSliderSkeleton}
                />
                <PlaceholderMedia
                  style={styles.popularProductsSliderSkeleton}
                />
              </View>
            </Placeholder>
          ) : (
            <PopularProductsRow
              products={allProducts}
              onPressProduct={onPressProductHandler}
              onPressSeeMore={onPressSeeMoreHandler}
            />
          )}
          <HeaderText style={{ marginTop: 40, marginBottom: 20 }}>
            Recommended
          </HeaderText>
          {isLoading ? (
            <Placeholder Animation={Fade}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <PlaceholderMedia
                  style={{
                    width: DeviceDimensions.width - 60,
                    height: DeviceDimensions.height / 3.807,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginRight: 20,
                  }}
                />
                <PlaceholderMedia
                  style={{
                    width: DeviceDimensions.width - 60,
                    height: DeviceDimensions.height / 4.1,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                />
              </View>
            </Placeholder>
          ) : (
            <View>
              <RecommendedCarousel
                products={allProducts}
                onPressProduct={onPressProductHandler}
              />
            </View>
          )}
          <HeaderText style={{ marginTop: 40 }}>Hot Sales</HeaderText>
          <SmallBanners
            onPress={(id, headerData) => {
              props.navigation.navigate("Sales", {
                id,
                headerData,
              });
            }}
          />
        </View>
        <RatingModal
          products={
            route.params && route.params.orderedProducts
              ? route.params.orderedProducts
              : []
          }
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
          }}
          storeRatings={(ratings) => {
            setShowModal(false);
            for (const key in ratings) {
              dispatch(
                productActions.updateProductDetails(
                  ratings[key].product,
                  ratings[key].rating
                )
              );
            }
          }}
        />
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
    marginTop: 20,
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

  popularProductsSliderSkeleton: {
    width: 150,
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 20,
  },
});

export default HomeScreen;
