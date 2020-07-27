import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import HeaderText from "./Text/HeaderText";
import AnalyticsCard from "./UI/AnalyticsCard";
import ProductItem from "./UI/ProductItem";
import BodyText from "./Text/BodyText";
import CategoryHeaderText from "./Text/CategoryHeaderText";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

let TouchableComponent = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const AccountBuyerScreen = (props) => {
  const allOrders = useSelector((state) => state.orders.allOrders);
  const userId = useSelector((state) => state.authentication.userId);

  const allProductDiscussion = useSelector(
    (state) => state.productDiscussion.allProductDiscussion
  );

  const ratings = useSelector((state) => state.ratings.ratings);

  const orders = useSelector((state) => state.orders.orders);

  // console.log("ORDERS: ");
  // console.log(orders);

  let leftArray = [];
  let rightArray = [];

  for (const key in orders) {
    for (const index in orders[key].items) {
      if (leftArray.length + rightArray.length === 10) {
        break;
      }
      let item = orders[key].items[index].item;
      if (key % 2 === 0) {
        leftArray.push(item);
      } else {
        rightArray.push(item);
      }
    }
  }
  let userOrders;

  if (allOrders.length > 0) {
    userOrders = allOrders.filter((orders) => orders.userId === userId);

    if (userOrders.length > 0) {
      userOrders = userOrders[0].orders;
    }
  }

  // console.log("USER ORDERS: ");
  // console.log(userOrders.orders);

  let purchases = 0;
  let pastPurchases = 0;

  for (const key in userOrders) {
    let orderDate = userOrders[key].orderDate;

    let items = userOrders[key].items;

    for (const item in items) {
      let itemQuantity = items[item].itemQuantity;

      if (
        orderDate.split(" ")[0] === moment().format("MMM") &&
        orderDate.split(" ")[2] === moment().format("YYYY") + ","
      ) {
        purchases += itemQuantity;
      } else if (
        moment(orderDate.split(" ")[0], "MMM").fromNow() === "a month ago"
      ) {
        pastPurchases += itemQuantity;
      }
    }
  }

  // console.log("PURCHASES:");
  // console.log(purchases);
  // console.log("PAST PURCHASES:");
  // console.log(pastPurchases);

  let userProductDiscussion = 0;

  for (const product in allProductDiscussion) {
    for (const discussionId in allProductDiscussion[product]
      .productDiscussion) {
      let productDiscussionItem =
        allProductDiscussion[product].productDiscussion[discussionId];

      if (productDiscussionItem.senderId === userId) {
        userProductDiscussion++;
      }
    }
  }

  let userRatings = 0;
  let pastUserRatings = 0;

  for (const user in ratings) {
    // console.log(ratings[user]);
    if (ratings[user].user === userId) {
      for (const rating in ratings[user].userRatings) {
        let userRating = ratings[user].userRatings[rating];

        if (userRating.date === moment().format("MMMM YYYY")) {
          userRatings++;
        } else if (
          moment(userRating.date, "MMMM YYYY").fromNow() === "a month ago"
        ) {
          pastUserRatings++;
        }
      }
    }
  }

  // console.log("USER RATINGS: " + userRatings);
  // console.log("PAST USER RATINGS: " + pastUserRatings);

  let activityScore =
    purchases * 50 + userProductDiscussion * 20 + userRatings * 20;
  // console.log(activityScore);

  let pastActivityScore =
    pastPurchases * 50 + userProductDiscussion * 20 + pastUserRatings * 20;
  // console.log(pastActivityScore);

  let feedbackScore = userProductDiscussion * 100 + userRatings * 50;

  let pastFeedbackScore = userProductDiscussion * 100 + pastUserRatings * 50;

  const renderListItem = (item, side) => {
    return (
      <View key={uuidv4()} style={styles.listItem}>
        <ProductItem
          style={{
            width: 166.365,
            height: 255.093,
          }}
          cardContainerStyle={
            side === "right" && {
              marginLeft: 12,
            }
          }
          titleStyle={{
            fontSize: 18,
          }}
          onTap={(id) => {
            props.navigation.navigate("Product Details", {
              id,
            });
          }}
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          rating={item.rating}
        />
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <HeaderText style={{ marginTop: 30, marginBottom: 10 }}>
        Analytics
      </HeaderText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AnalyticsCard
          percentChange={
            purchases === 0 && pastPurchases === 0
              ? 0
              : ((purchases - pastPurchases) / pastPurchases) * 100
          }
          backgroundColor={Colors.primary}
          label="Successful Purchases"
          data={purchases}
        />
        <AnalyticsCard
          percentChange={
            activityScore === 0 && pastActivityScore === 0
              ? 0
              : ((activityScore - pastActivityScore) / pastActivityScore) * 100
          }
          backgroundColor="#D32626"
          label="Activity"
          data={activityScore}
        />
        <AnalyticsCard
          percentChange={
            feedbackScore === 0 && pastFeedbackScore === 0
              ? 0
              : ((feedbackScore - pastFeedbackScore) / pastFeedbackScore) * 100
          }
          backgroundColor="#FD7792"
          label="Feedback"
          data={feedbackScore}
        />
      </View>
      <HeaderText style={{ marginTop: 30 }}>Past Purchases</HeaderText>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          {leftArray.map((category) => renderListItem(category, "left"))}
        </View>
        <View
          style={{
            marginTop: 40,
            marginLeft: -2,
          }}
        >
          {rightArray.map((category) => renderListItem(category, "right"))}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          props.navigation.navigate("Order History");
        }}
      >
        <View style={styles.seeMoreRow}>
          <BodyText style={{ color: Colors.primary, marginRight: 5 }}>
            See More
          </BodyText>
          <Image source={require("../assets/icons/Arrow_red.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  seeMoreRow: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  listItem: {
    marginTop: 20,
  },
});

export default AccountBuyerScreen;
