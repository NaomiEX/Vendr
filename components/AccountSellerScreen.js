import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
// import { BarChart } from "react-native-chart-kit";
import { BarChart } from "react-native-svg-charts";

import AnalyticsCard from "./UI/AnalyticsCard";
import HeaderText from "./Text/HeaderText";
import BodyText from "./Text/BodyText";
import ProductItem from "./UI/ProductItem";

import Colors from "../constants/Colors";
import DeviceDimensions from "../constants/DeviceDimensions";

const AccountSellerScreen = (props) => {
  const allOrders = useSelector((state) => state.orders.allOrders);
  const userId = useSelector((state) => state.authentication.userId);
  const discussion = useSelector(
    (state) => state.productDiscussion.allProductDiscussion
  );
  const userProducts = useSelector((state) => state.products.userProducts);
  const wishlistActivity = useSelector(
    (state) => state.wishlistActivity.wishlistActivity
  );

  // console.log("WISHLIST ACTIVITY:");
  // console.log(wishlistActivity);

  // console.log(allWishlists);

  // console.log("USER PRODUCTS:");
  // console.log(userProducts);

  let leftArray = [];
  let rightArray = [];

  for (const key in userProducts) {
    if (leftArray.length + rightArray.length >= 8) {
      break;
    }
    if (key % 2 === 0) {
      leftArray.push(userProducts[key]);
    } else {
      rightArray.push(userProducts[key]);
    }
  }

  // console.log("LEFT ARRAY:");
  // console.log(leftArray);

  let userProductIds = [];

  for (const key in userProducts) {
    userProductIds.push(userProducts[key].id);
  }

  let wishlist = 0;
  let pastWishlist = 0;

  for (const key in wishlistActivity) {
    if (
      userProductIds.includes(wishlistActivity[key].productId) &&
      wishlistActivity[key].date === moment().format("MMMM YYYY")
    ) {
      wishlist++;
    } else if (
      userProductIds.includes(wishlistActivity[key].id) &&
      moment(wishlistActivity[key].date, "MMMM YYYY").fromNow() ===
        "a month ago"
    ) {
      pastWishlist++;
    }
  }
  // console.log("FILTERED WISHLIST: ");
  // console.log(filteredWishlist);
  // console.log("USER PRODUCT IDS:");
  // console.log(userProductIds);

  // console.log("WISHLIST: " + wishlist);
  // console.log("PAST WISHLIST: " + pastWishlist);

  const filteredDiscussion = discussion.filter((item) =>
    userProductIds.includes(item.productId)
  );

  // console.log("FILTERED DISCUSSION:");
  // console.log(filteredDiscussion);
  // console.log(discussion);

  let responseRate = 0;
  for (const product in filteredDiscussion) {
    let productDiscussion = filteredDiscussion[product].productDiscussion;
    for (const discussion in productDiscussion) {
      responseRate += 10;
    }
  }

  let sales = 0;
  let pastSales = 0;
  let totalEarnings = 0;
  let earningsThisMonth = 0;
  let earningsPerDay = Array(+moment().format("DD")).fill(0);

  // console.log();

  for (const key in allOrders) {
    let userOrders = allOrders[key].orders;
    // console.log("USER ORDERSSSSS:");
    // console.log(userOrders);
    for (const id in userOrders) {
      let orderItems = userOrders[id].items;
      // console.log(userOrders[id].orderDate);
      let orderDate = userOrders[id].orderDate;

      for (const item in orderItems) {
        let itemOrdered = orderItems[item].item;

        if (itemOrdered.ownerId === userId) {
          totalEarnings += +itemOrdered.price;
          if (
            orderDate.split(" ")[0] === moment().format("MMM") &&
            orderDate.split(" ")[2] === moment().format("YYYY") + ","
          ) {
            let day = +orderDate.split(" ")[1].slice(0, -2) - 1;
            earningsPerDay[day] += 4;
            sales++;
            earningsThisMonth += +itemOrdered.price;
          } else if (
            moment(orderDate.split(" ")[0], "MMM").fromNow() === "a month ago"
          ) {
            pastSales++;
          }
        }
      }
    }
  }

  // console.log("SALES: ");
  // console.log(sales);
  // console.log("PAST SALES: ");
  // console.log(pastSales);
  // console.log("TOTAL EARNINGS: " + totalEarnings);
  // console.log("EARNINGS THIS MONTH: " + earningsThisMonth);

  // console.log("EARNINGS PER DAY:");
  // console.log(earningsPerDay);

  const renderListItem = (item, side) => {
    return (
      <View key={item.id} style={styles.listItem}>
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
    <View style={{ marginHorizontal: 20 }}>
      <HeaderText style={{ marginTop: 30, marginBottom: 10 }}>
        Analytics
      </HeaderText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AnalyticsCard
          percentChange={
            sales === 0 && pastSales === 0
              ? 0
              : ((sales - pastSales) / pastSales) * 100
          }
          backgroundColor="#4DD599"
          label="Successful Sales"
          data={sales}
        />
        <AnalyticsCard
          percentChange={
            responseRate === 0 ? 0 : ((responseRate - 50) / 50) * 100
          }
          backgroundColor="#A2DE96"
          label="Response Rate"
          data={responseRate}
        />
        <AnalyticsCard
          percentChange={
            wishlist === 0
              ? 0
              : ((wishlist - pastWishlist) / pastWishlist) * 100
          }
          backgroundColor="#12CAD6"
          label="Wishlist"
          data={wishlist}
        />
      </View>
      <View style={styles.earningsSection}>
        <HeaderText style={{}}>Earnings</HeaderText>
        <View style={styles.earningsRow}>
          <BodyText style={{ color: "rgba(0,0,0,0.6)" }}>
            Total Balance
          </BodyText>
          <Text style={styles.earnings}>${totalEarnings.toFixed(2)}</Text>
        </View>
        <View style={styles.earningsThisMonthSection}>
          <View>
            <BodyText>
              Earnings in{" "}
              <BodyText style={{ color: "#4DD599" }}>
                {moment().format("MMMM")}
              </BodyText>
            </BodyText>
            <Text
              style={{ ...styles.earnings, color: "#4DD599", marginTop: 20 }}
            >
              ${earningsThisMonth.toFixed(2)}
            </Text>
          </View>
          <BarChart
            style={{
              height: 65,
              width: 180,
            }}
            data={earningsPerDay}
            contentInset={{ top: 0, bottom: 0 }}
            svg={{ fill: "#4DD599" }}
            spacingInner={0.5}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <HeaderText style={{}}>My Products</HeaderText>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onTapButton}>
          <Image source={require("../assets/icons/turquoise_plus.png")} />
        </TouchableOpacity>
      </View>
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
          props.navigation.navigate("User Products");
        }}
      >
        <View style={styles.seeMoreRow}>
          <BodyText style={{ color: "#4DD599", marginRight: 5 }}>
            See More
          </BodyText>
          <Image source={require("../assets/icons/arrow_turquoise.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  earningsSection: {
    marginTop: 30,
    marginHorizontal: -20,
    backgroundColor: Colors.translucent_grey,
    width: DeviceDimensions.width,
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  earningsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  earnings: {
    fontFamily: "helvetica-bold",
    fontSize: 18,
  },

  earningsThisMonthSection: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    overflow: "hidden",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  listItem: {
    marginTop: 20,
  },
  seeMoreRow: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AccountSellerScreen;
