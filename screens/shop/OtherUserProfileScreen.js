import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ToastAndroid,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import Screen from "../../components/UI/BasicScreen";
import BodyText from "../../components/Text/BodyText";
import Divider from "../../components/UI/Divider";
import EmphasisText from "../../components/Text/EmphasisText";
import ProductItem from "../../components/UI/ProductItem";
import SkeletonOtherUserProfileScreen from "../../components/Skeletons/SkeletonOtherUserProfileScreen";

import DeviceDimensions from "../../constants/DeviceDimensions";
import Colors from "../../constants/Colors";

import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";
import * as addressesActions from "../../store/actions/addresses";
import * as ordersActions from "../../store/actions/orders";
import * as productsActions from "../../store/actions/products";
import * as notificationsActions from "../../store/actions/notifications";

const OtherUserProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sendNowPressed, setSendNowPressed] = useState(false);
  const [error, setError] = useState("");
  const [isSendNowLoading, setIsSendNowLoading] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();

  const userId = props.route.params.userId;

  // console.log(userId);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", async () => {
      await dispatch(otherUserProfilesActions.getOtherProfiles(userId));
      await dispatch(addressesActions.getShippingAddress());
      await dispatch(ordersActions.getAllOrders());
      setIsLoading(false);
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation, dispatch]);

  const userData = useSelector(
    (state) => state.otherUserProfiles.otherUsers
  )[0];
  const userShippingAddress = useSelector(
    (state) => state.addresses.shippingAddress
  );
  const userProducts = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => product.ownerId === userId);

  const username = useSelector((state) => state.userProfile.username);
  const profilePicture = useSelector(
    (state) => state.userProfile.profilePicture
  );
  const allOrders = useSelector((state) => state.orders.allOrders);

  // console.log("ALL ORDERS: ");
  // console.log(allOrders);

  let userOrders = [];
  let itemsBought = 0;
  let itemsSold = 0;

  if (allOrders.length > 0) {
    userOrders = allOrders.filter((orders) => orders.userId === userId);

    if (userOrders[0]) {
      userOrders = userOrders[0].orders;
    }
    for (const key in userOrders) {
      for (const index in userOrders[key].items) {
        itemsBought += userOrders[key].items[index].itemQuantity;
      }
    }

    for (const key in allOrders) {
      for (const index in allOrders[key].orders) {
        // console.log("INDEX: " + index);
        // console.log("ORDER ID: " + allOrders[key].orders[index].orderId);
        for (const num in allOrders[key].orders[index].items) {
          if (allOrders[key].orders[index].items[num].item.ownerId === userId) {
            itemsSold += allOrders[key].orders[index].items[num].itemQuantity;
          }
        }
      }
    }
  }

  // console.log("USER ORDERS: ");

  let leftArray = [];
  let rightArray = [];

  for (const index in userProducts) {
    if (leftArray.length + rightArray.length >= 4) {
      break;
    }
    if (index % 2 === 0) {
      leftArray.push(userProducts[index]);
    } else {
      rightArray.push(userProducts[index]);
    }
  }

  // console.log("USER PRODUCTS LEFT ARRAY:");
  // console.log(leftArray);
  // console.log("USER PRODUCTS RIGHT ARRAY:");
  // console.log(rightArray);

  // console.log("SHIPPING ADDRESS:");
  // console.log(userShippingAddress);

  // console.log("OTHER USER DATA:");
  // console.log(userData);
  // console.log("ALL ORDERS");
  // console.log(allOrders);

  // console.log(userData);

  // console.log("NUM OF ITEMS BOUGHT: " + itemsBought);
  // console.log("NUM OF ITEMS SOLD: " + itemsSold);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
            setSendNowPressed(false);
            setIsSendNowLoading(false);
          },
        },
      ]);
    }
  }, [error]);

  useEffect(() => {
    const sendNowHandler = async () => {
      Keyboard.dismiss();
      setError(null);
      setIsSendNowLoading(true);
      let isValid = true;
      if (message === "") {
        isValid = false;
      }

      if (!isValid) {
        setError("Please fill out all the fields");
      } else {
        try {
          await dispatch(
            notificationsActions.storeNotification(
              "message",
              userData.uid,
              "",
              message
            )
          );
          setIsSendNowLoading(false);
          setSendNowPressed(false);
          ToastAndroid.showWithGravityAndOffset(
            "Message Sent!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            160
          );
        } catch (err) {
          if (pressed) {
            setError(err.message);
          }
          setIsSendNowLoading(false);
          sendNowPressed(false);
        }
      }
    };

    if (sendNowPressed) {
      sendNowHandler();
    }
  }, [sendNowPressed]);

  const inputChangeHandler = (text) => {
    setMessage(text);
  };

  const onPressHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  const renderProductItem = (product) => {
    return (
      <View key={product.id} style={{ marginTop: 12 }}>
        <ProductItem
          style={{
            width: 170.5,
            height: 248,
          }}
          cardContainerStyle={{
            marginRight: 12,
          }}
          titleStyle={{
            fontSize: 18,
          }}
          onTap={onPressHandler}
          id={product.id}
          thumbnail={product.thumbnail}
          title={product.title}
          price={product.price}
          rating={product.rating}
        />
        {/* <Image
          style={{ width: 170.5, height: 248 }}
          source={{ uri: product.thumbnail.imageUrl }}
        /> */}
      </View>
    );
  };

  if (isLoading) {
    return <SkeletonOtherUserProfileScreen />;
  }

  return (
    <ScrollView
      removeClippedSubviews={true}
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View style={styles.profileContainer}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: userData.profilePicture }}
            />
          </View>
          <Text style={styles.username}>{userData.username}</Text>
          <BodyText style={{ color: Colors.inactive_grey, marginTop: 5 }}>
            {userData.fullName}
          </BodyText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              style={{ marginBottom: 2, marginRight: 5 }}
              name={Platform.OS === "android" ? "md-pin" : "ios-pin"}
              size={13}
              color={Colors.translucent_grey}
            />
            <BodyText style={{ color: Colors.inactive_grey }}>
              {userShippingAddress ? userShippingAddress.city : ""},{" "}
              {userShippingAddress ? userShippingAddress.country : ""}
            </BodyText>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.mainStatistic}>{userProducts.length}</Text>
              <BodyText style={{ color: Colors.inactive_grey }}>
                User Products
              </BodyText>
              <Divider dividerStyle={{ width: 50, height: 1 }} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.mainStatistic}>{itemsBought}</Text>
              <BodyText style={{ color: Colors.inactive_grey }}>
                Products Bought
              </BodyText>
              <Divider dividerStyle={{ width: 60, height: 1 }} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.mainStatistic}>{itemsSold}</Text>
              <BodyText style={{ color: Colors.inactive_grey }}>
                Products Sold
              </BodyText>
              <Divider dividerStyle={{ width: 55, height: 1 }} />
            </View>
          </View>
        </View>
        {/* body */}
        <View style={{ paddingHorizontal: 20, marginTop: 0 }}>
          <View>
            <Text style={styles.categoryHeader}>About {userData.username}</Text>
            <BodyText style={styles.bodyText}>{userData.bio}</BodyText>
            <Text style={styles.categoryHeader}>
              Contact {userData.username}
            </Text>
            <BodyText style={styles.bodyText}>Email: {userData.email}</BodyText>
          </View>
          {/* Contact directly container */}
          <View style={styles.contactDirectlyContainer}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
              <BodyText style={styles.darkBodyText}>
                Send a message directly:
              </BodyText>
              <BodyText
                style={{
                  ...styles.darkBodyText,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                MESSAGE
              </BodyText>
              <TextInput
                value={message}
                onChangeText={inputChangeHandler}
                multiline
                style={styles.messageTextInput}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setSendNowPressed(true);
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  {isSendNowLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <EmphasisText style={{ color: "#4a4a4a" }}>
                        Send Now
                      </EmphasisText>
                      <Image
                        style={{ marginLeft: 5 }}
                        source={require("../../assets/icons/next_arrow.png")}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.categoryHeader}>User Products</Text>

          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <View>{leftArray.map((item) => renderProductItem(item))}</View>
              <View style={{ marginTop: 40 }}>
                {rightArray.map((item) => renderProductItem(item))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },

  username: {
    fontSize: 24,
    fontFamily: "helvetica-light",
    color: Colors.primary,
    marginTop: 20,
  },

  mainStatistic: {
    fontFamily: "helvetica-standard",
    fontSize: 24,
    color: Colors.primary,
  },

  categoryHeader: {
    fontSize: 16,
    fontFamily: "helvetica-light",
    color: Colors.black,
    marginTop: 40,
  },
  bodyText: { color: Colors.inactive_grey, marginTop: 5 },

  contactDirectlyContainer: {
    backgroundColor: Colors.barely_there_grey,
    marginHorizontal: -20,
    marginTop: 15,
  },

  darkBodyText: {
    color: Colors.grey,
  },

  nameTextInput: {
    borderBottomColor: Colors.inactive_grey,
    borderBottomWidth: 1.5,
    width: DeviceDimensions.width / 1.422,
    height: 30,
    color: Colors.black,
    fontSize: 13,
    marginTop: 5,
    paddingHorizontal: 1,
    paddingBottom: 2,
  },

  messageTextInput: {
    borderColor: Colors.inactive_grey,
    height: 100,
    borderWidth: 1.5,
    textAlignVertical: "top",
    color: Colors.black,
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default OtherUserProfileScreen;
