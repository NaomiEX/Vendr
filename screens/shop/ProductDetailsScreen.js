import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Rating } from "react-native-ratings";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../../data/categories";

import Screen from "../../components/UI/BasicScreen";
import ProductImagesCarousel from "../../components/UI/ProductImagesCarousel";
import BubbleIcon from "../../components/UI/BubbleIcon";
import ChipRow from "../../components/ChipRow";
import Divider from "../../components/UI/Divider";
import EmphasisText from "../../components/Text/EmphasisText";
import BodyText from "../../components/Text/BodyText";
import ExpandingText from "../../components/ExpandingText";
import AddToCartButton from "../../components/AddToCartButton";
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";
import * as wishlistActions from "../../store/actions/wishlist";
import * as productActions from "../../store/actions/products";

// const data = [
//   require("../../assets/black_headphones.jpg"),
//   require("../../assets/Take_A_Picture.png"),
//   require("../../assets/black_headphones.jpg"),
// ];

const ProductDetailsScreen = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [statusBarLight, setStatusBarLight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionButtonImage, setActionButtonImage] = useState(
    require("../../assets/icons/heart_empty.png")
  );
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [filCat, setFilCat] = useState();

  const { navigation, route } = props;
  const dispatch = useDispatch();

  const productId = route.params.id;

  const thisProduct = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => product.id === productId)[0];

  const wishlistProduct = useSelector(
    (state) => state.wishlist.products
  ).filter((product) => product.productId === thisProduct.id);
  // console.log("WISHLIST PRODUCTS FROM THE PRODUCT DETAIL SCREEN:");
  // console.log(wishlistProduct);

  const userId = useSelector((state) => state.authentication.userId);

  // console.log("USER ID:" + userId);

  useEffect(() => {
    if (thisProduct.ownerId === userId) {
      // console.log("THIS IS THE USER'S PRODUCT");
      setActionButtonImage(require("../../assets/icons/edit.png"));
    } else if (wishlistProduct.length > 0) {
      setActionButtonImage(require("../../assets/icons/heart.png"));
    } else if (wishlistProduct.length === 0) {
      setActionButtonImage(require("../../assets/icons/heart_empty.png"));
    }
  }, [actionButtonImage, userId, wishlistProduct]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      // setIsLoading(true);
      setStatusBarLight(true);
      // console.log("THIS PRODUCT'S OWNER ID IS: ");
      // console.log(thisProduct.ownerId);
      await dispatch(
        otherUserProfilesActions.getOtherProfiles([thisProduct.ownerId])
      );
      await dispatch(productActions.updateProductDetails(thisProduct));
      // setIsLoading(false);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setStatusBarLight(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, dispatch, statusBarLight, isLoading]);
  // console.log("THIS PRODUCT:");
  // console.log(thisProduct);

  const ownerProfile = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  )[0];
  // console.log("OWNER PROFILE");
  // console.log(ownerProfile);
  let imageUrl;
  let ownerUsername;

  // let filCat;

  useEffect(() => {
    setFilCat(
      CATEGORIES.filter((category) =>
        thisProduct.categories.includes(category.title)
      )
    );
  }, [thisProduct]);

  // const filteredCategories = CATEGORIES.filter((category) =>
  //   thisProduct.categories.includes(category.title)
  // );
  // console.log("Filtered Categories:");
  // console.log(filteredCategories);

  if (ownerProfile) {
    ownerUsername = ownerProfile.username;
    if (ownerProfile.profilePicture === "") {
      imageUrl = require("../../assets/Anonymous.png");
    } else {
      imageUrl = { uri: ownerProfile.profilePicture };
    }
  }

  const testDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in sodales ex, vel molestie dui. Aliquam ut condimentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla urna odio, semper quis convallis porta, tempus a leo. Aliquam volutpat enim gravida orci rhoncus tempor. Maecenas sit amet purus fermentum, fringilla nibh tempor, vestibulum turpis. Integer id dolor quis felis efficitur porttitor non a mauris. Proin posuere ante vel dui rhoncus pulvinar. Integer finibus suscipit ante, quis tincidunt mauris gravida a. Maecenas ligula nunc, vehicula sit amet mauris a, gravida molestie enim. Phasellus pretium faucibus lorem, sed tincidunt orci euismod et. Vivamus et eleifend felis. Suspendisse potenti. Ut cursus ligula ut orci tempor lacinia. Pellentesque ac congue ipsumaaaaaaaaaaaaaa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in sodales ex, vel molestie dui. Aliquam ut condimentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla urna odio, semper quis convallis porta, tempus a leo. Aliquam volutpat enim gravida orci rhoncus tempor. Maecenas sit amet purus fermentum, fringilla nibh tempor, vestibulum turpis. Integer id dolor quis felis efficitur porttitor non a mauris. Proin posuere ante vel dui rhoncus pulvinar. Integer finibus suscipit ante, quis tincidunt mauris gravida a. Maecenas ligula nunc, vehicula sit amet mauris a, gravida molestie enim. Phasellus pretium faucibus lorem, sed tincidunt orci euismod et.";
  // console.log("DESCRIPTION LENGTH:");
  // console.log(testDescription.length);

  // console.log("owner profile pic:" + ownerProfile.profilePicture);

  const onClickHandler = useCallback(() => {
    const addToWishlist = async () => {
      setWishlistLoading(true);
      setActionButtonImage(require("../../assets/icons/heart.png"));
      await dispatch(wishlistActions.addToWishlist(thisProduct.id));
      setWishlistLoading(false);
    };

    const deleteFromWishlist = async () => {
      setWishlistLoading(true);
      setActionButtonImage(require("../../assets/icons/heart_empty.png"));
      await dispatch(
        wishlistActions.deleteFromWishlist(wishlistProduct[0].wishlistName)
      );
      setWishlistLoading(false);
    };
    if (actionButtonImage === require("../../assets/icons/edit.png")) {
      // console.log("GO TO EDIT PRODUCT SCREEN");
      props.navigation.navigate("Edit Product", {
        id: thisProduct.id,
        title: thisProduct.title,
        price: thisProduct.price,
        thumbnail: thisProduct.thumbnail,
        productImages: thisProduct.productImages,
        description: thisProduct.description,
        categories: thisProduct.categories,
      });
    } else if (
      actionButtonImage === require("../../assets/icons/heart_empty.png")
    ) {
      // setActionButtonImage(require("../../assets/icons/heart.png"));
      // dispatch(wishlistActions.addToWishlist(thisProduct));
      addToWishlist();
    } else if (actionButtonImage === require("../../assets/icons/heart.png")) {
      deleteFromWishlist();
    }
  }, [actionButtonImage]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar barStyle={statusBarLight ? "light-content" : "dark-content"} />
      <ProductImagesCarousel
        data={thisProduct.productImages}
        itemWidth={DeviceDimensions.width}
        sliderWidth={DeviceDimensions.width}
        onSnapToItem={(index) => {
          setActiveSlide(index);
        }}
      />
      <View style={styles.cardContainer}>
        <View style={styles.heartIconContainer}>
          {wishlistLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <BubbleIcon
              iconBackgroundColor="white"
              icon={actionButtonImage}
              onClick={onClickHandler}
              iconStyle={{
                width: 32,
                height: 29.59,
                elevation: 4,
              }}
            />
          )}
        </View>
        <View style={styles.pagination}>
          <Pagination
            dotsLength={thisProduct.productImages.length}
            activeDotIndex={activeSlide}
            dotColor={Colors.primary}
            inactiveDotColor={Colors.inactive_grey}
            inactiveDotOpacity={0.8}
            inactiveDotScale={0.8}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
            }}
            dotContainerStyle={{
              marginHorizontal: 4,
            }}
          />
        </View>
        {/* info header */}
        <View
          style={thisProduct.productImages.length === 1 && { marginTop: 65 }}
        >
          <View style={styles.infoHeaderContainer}>
            <BubbleIcon
              width={50}
              height={50}
              borderRadius={30}
              profilePicture={imageUrl}
              onClickEdit={() => {}}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}>{thisProduct.title}</Text>
            </View>
          </View>
          {/* categories chip row */}
          <View style={{ marginLeft: 62 }}>
            {filCat ? (
              <ChipRow data={filCat} />
            ) : (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}
          </View>
        </View>
        <View style={styles.dividerContainer}>
          <Divider
            dividerStyle={{ width: DeviceDimensions.width - 60, height: 1.8 }}
          />
        </View>
        <EmphasisText style={{ color: Colors.inactive_grey }}>
          Product Details
        </EmphasisText>
        <View style={styles.ratingsContainer}>
          <Rating
            readonly={true}
            startingValue={thisProduct.rating.average}
            fractions={1}
            imageSize={25}
            style={styles.ratings}
          />
          <EmphasisText style={{ marginLeft: 20 }}>
            {thisProduct.rating.average} | {thisProduct.rating.numOfRatings}{" "}
            ratings
          </EmphasisText>
        </View>
        <ExpandingText
          textStyle={{ lineHeight: 20, marginTop: 10 }}
          expanderStyle={{ textDecorationLine: "underline" }}
          numOfLines={6}
          boundaryLength={362}
          text={thisProduct.description}
        />
        <View style={styles.priceAndCartButtonContainer}>
          <Text style={styles.price}>${thisProduct.price}</Text>
          <AddToCartButton
            productId={thisProduct.id}
            productPrice={thisProduct.price}
            ownerUsername={ownerUsername}
          />
        </View>

        <BodyText>{testDescription}</BodyText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    elevation: 10,
    paddingHorizontal: 30,
  },

  activityIndicator: { width: 60, height: 60, paddingTop: 10 },

  heartIconContainer: { alignItems: "flex-end", marginTop: -30 },

  pagination: { marginTop: -40, marginBottom: -10 },

  infoHeaderContainer: { flexDirection: "row", alignItems: "center" },

  title: {
    fontFamily: "helvetica-bold",
    fontSize: 20,
  },

  dividerContainer: { marginTop: 20, marginBottom: 20, alignItems: "center" },

  ratings: { alignItems: "flex-start" },

  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },

  priceAndCartButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },

  price: {
    color: Colors.accent,
    fontFamily: "helvetica-light",
    fontSize: 36,
    letterSpacing: 2,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTransparent: true,
    headerBackground: () => (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
        <View></View>
      </LinearGradient>
    ),
    headerTitle: null,
    headerTintColor: "white",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

export default ProductDetailsScreen;
