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
  TextInput,
  Alert,
  ToastAndroid,
  Keyboard,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Rating } from "react-native-ratings";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Progressive,
  ShineOverlay,
} from "rn-placeholder";

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
import ProductDiscussion from "../../components/ProductDiscussion";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";
import * as wishlistActions from "../../store/actions/wishlist";
import * as productActions from "../../store/actions/products";
import * as notificationActions from "../../store/actions/notifications";
import * as productDiscussionActions from "../../store/actions/productDiscussion";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ProductDetailsScreen = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [statusBarLight, setStatusBarLight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionButtonImage, setActionButtonImage] = useState(
    require("../../assets/icons/heart_empty.png")
  );
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [filCat, setFilCat] = useState();
  const [message, setMessage] = useState("");
  const [discussionLoading, setDiscussionLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { navigation, route } = props;
  const dispatch = useDispatch();

  const productId = route.params.id;

  const thisProduct = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => product.id === productId)[0];

  const wishlistProduct = useSelector(
    (state) => state.wishlist.products
  ).filter((product) => product.productId === thisProduct.id);

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
      // await dispatch(notificationActions.getProductDiscussion(productId));
      // await dispatch(
      //   otherUserProfilesActions.getOtherProfiles([thisProduct.ownerId])
      // );
      // await dispatch(productActions.updateProductDetails(thisProduct));
      // await dispatch(productDiscussionActions.getProductDiscussion(productId));
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

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await dispatch(
        otherUserProfilesActions.getOtherProfiles([thisProduct.ownerId])
      );
      await dispatch(productActions.updateProductDetails(thisProduct));
      await dispatch(productDiscussionActions.getProductDiscussion(productId));
      setIsLoading(false);
    };

    getData();
  }, [dispatch, refreshing]);

  const ownerProfile = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  )[0];
  let imageUrl;
  let ownerUsername;

  useEffect(() => {
    setFilCat(
      CATEGORIES.filter((category) =>
        thisProduct.categories.includes(category.title)
      )
    );
  }, [thisProduct]);

  if (ownerProfile) {
    ownerUsername = ownerProfile.username;
    if (ownerProfile.profilePicture === "") {
      imageUrl = require("../../assets/Anonymous.png");
    } else {
      imageUrl = { uri: ownerProfile.profilePicture };
    }
  }
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

  const onPressSubmitDiscussionHandler = () => {
    Keyboard.dismiss();
    const storeDiscussion = async () => {
      setDiscussionLoading(true);
      await dispatch(
        notificationActions.storeNotification(
          "product discussion post",
          thisProduct.ownerId,
          "",
          thisProduct.title
        )
      );
      await dispatch(
        productDiscussionActions.storeProductDiscussion(
          "post",
          productId,
          "",

          message
        )
      );
      await dispatch(productDiscussionActions.getProductDiscussion(productId));
      setDiscussionLoading(false);
      setMessage("");
      ToastAndroid.showWithGravityAndOffset(
        "Message Successfully Posted!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        160
      );
    };

    message.length > 5
      ? storeDiscussion()
      : Alert.alert(
          "Message is too short",
          "Please enter a message that is at least 5 characters long",
          [{ text: "Ok" }]
        );
  };

  const onSubmitReplyHandler = async (messageInfo, message) => {
    await dispatch(
      productDiscussionActions.storeProductDiscussion(
        "reply",
        productId,
        messageInfo,
        message
      )
    );
    await dispatch(productDiscussionActions.getProductDiscussion(productId));
    await dispatch(
      notificationActions.storeNotification(
        "product discussion reply",
        thisProduct.ownerId,
        "",
        thisProduct.title
      )
    );
  };

  const navigateToUserDetailsScreen = (userId) => {
    props.navigation.navigate("Other User Profile", {
      userId,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{ backgroundColor: "white" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ backgroundColor: "white" }}>
        <StatusBar
          barStyle={statusBarLight ? "light-content" : "dark-content"}
        />
        {isLoading ? (
          <Placeholder Animation={Fade}>
            <PlaceholderMedia
              style={{
                width: DeviceDimensions.width,
                height: DeviceDimensions.width * 0.9,
              }}
            />
          </Placeholder>
        ) : (
          <ProductImagesCarousel
            data={thisProduct.productImages}
            itemWidth={DeviceDimensions.width}
            sliderWidth={DeviceDimensions.width}
            onSnapToItem={(index) => {
              setActiveSlide(index);
            }}
          />
        )}
        <View style={styles.cardContainer}>
          <View style={styles.heartIconContainer}>
            {wishlistLoading ? (
              <View
                style={{
                  backgroundColor: "white",
                  width: 60,
                  height: 60,
                  elevation: 4,
                  borderRadius: 30,
                  overflow: "hidden",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="small" color={Colors.primary} />
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
              {isLoading ? (
                <Placeholder Animation={Fade}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <PlaceholderMedia
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        overflow: "hidden",
                      }}
                    />
                    <PlaceholderLine
                      style={{ marginLeft: 10, marginTop: 10 }}
                      width={50}
                      height={22}
                    />
                  </View>
                </Placeholder>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BubbleIcon
                    width={50}
                    height={50}
                    borderRadius={30}
                    profilePicture={imageUrl}
                    onClickEdit={
                      ownerProfile &&
                      navigateToUserDetailsScreen.bind(this, ownerProfile.uid)
                    }
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>{thisProduct.title}</Text>
                  </View>
                </View>
              )}
            </View>
            {/* categories chip row */}
            <View style={{ marginLeft: 62 }}>
              {filCat ? (
                <ChipRow data={filCat} />
              ) : (
                <Placeholder Animation={Fade}>
                  <PlaceholderLine style={{ marginBottom: 2 }} height={26} />
                </Placeholder>
              )}
            </View>
          </View>
          <View style={styles.dividerContainer}>
            <Divider
              dividerStyle={{ width: DeviceDimensions.width - 60, height: 1 }}
            />
          </View>
          <EmphasisText
            style={{ color: Colors.inactive_grey, marginBottom: 0 }}
          >
            Product Details
          </EmphasisText>
          {isLoading ? (
            <Placeholder Animation={Fade}>
              <PlaceholderLine
                width={65}
                height={21}
                style={{ marginTop: 10 }}
              />
            </Placeholder>
          ) : (
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
          )}
          {isLoading ? (
            <Placeholder Animation={Fade}>
              <PlaceholderLine height={12} style={{ marginTop: 10 }} />
            </Placeholder>
          ) : (
            <ExpandingText
              textStyle={{ lineHeight: 20, marginTop: 10 }}
              expanderStyle={{ textDecorationLine: "underline" }}
              numOfLines={6}
              boundaryLength={362}
              text={thisProduct.description}
            />
          )}
          {isLoading ? (
            <Placeholder Animation={Fade}>
              <View style={styles.priceAndCartButtonContainer}>
                <PlaceholderLine
                  height={40}
                  width={90}
                  style={{ marginBottom: 5 }}
                />
              </View>
            </Placeholder>
          ) : (
            <View style={styles.priceAndCartButtonContainer}>
              <Text style={styles.price}>${thisProduct.price}</Text>
              <AddToCartButton
                productId={thisProduct.id}
                productPrice={thisProduct.price}
                ownerUsername={ownerUsername}
              />
            </View>
          )}
          <Divider dividerStyle={{ width: "100%", height: 1, marginTop: 40 }} />
          <EmphasisText
            style={{
              color: Colors.inactive_grey,
              marginTop: 50,
              marginBottom: 10,
            }}
          >
            Product Discussion
          </EmphasisText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.barely_there_grey,
            }}
          >
            <TextInput
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
              multiline={true}
              placeholder="Join the discussion..."
              placeholderTextColor={Colors.inactive_grey}
              style={{
                width: 300,
                paddingHorizontal: 10,
                marginRight: 20,
                paddingVertical: 5,
              }}
            />
            <TouchableOpacity onPress={onPressSubmitDiscussionHandler}>
              <Image source={require("../../assets/icons/next_arrow.png")} />
            </TouchableOpacity>
          </View>
          {discussionLoading && (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="small"
              color={Colors.primary}
            />
          )}
          {!isLoading && (
            <ProductDiscussion
              onSubmitReplyHandler={onSubmitReplyHandler}
              onClickProfilePicture={navigateToUserDetailsScreen}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    elevation: 10,
    paddingHorizontal: 30,
    paddingBottom: 80,
  },

  heartIconContainer: { alignItems: "flex-end", marginTop: -30 },

  pagination: { marginTop: -40, marginBottom: -10 },

  infoHeaderContainer: { flexDirection: "row", alignItems: "center" },

  title: {
    fontFamily: "helvetica-bold",
    fontSize: 20,
  },

  dividerContainer: { marginTop: 40, marginBottom: 40, alignItems: "center" },

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
    marginTop: 50,
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
