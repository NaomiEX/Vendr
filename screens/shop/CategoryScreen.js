import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  ToastAndroid,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";

import * as productsActions from "../../store/actions/products";
import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import PopularProductsRow from "../../components/PopularProductsRow";
import FeaturedSellers from "../../components/FeaturedSellers";
import ProductItem from "../../components/UI/ProductItem";
import SkeletonProductsList from "../../components/Skeletons/SkeletonProductsList";
import { TouchableOpacity } from "react-native-gesture-handler";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CategoryScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [maximumLength, setMaximumLength] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await dispatch(productsActions.fetchProducts());
      await dispatch(otherUserProfilesActions.getOtherProfiles(ownerIds));
      setIsLoading(false);
    };

    getData();
  }, [dispatch, refreshing]);

  const categoryTitle = props.route.params.title;

  const products = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => product.categories.includes(categoryTitle));

  let ownerIds = [];

  for (const key in products) {
    ownerIds.push(products[key].ownerId);
  }

  // console.log("OWNER IDS:");
  // console.log(ownerIds);

  const onPressHandler = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  let leftArray = [];
  let rightArray = [];

  for (const index in products) {
    if (leftArray.length + rightArray.length >= 10) {
      break;
    }
    if (index % 2 === 0) {
      leftArray.push(products[index]);
    } else {
      rightArray.push(products[index]);
    }
  }

  const onPressSeeMoreHandler = (type, products) => {
    props.navigation.navigate("Products", {
      type,
      products,
    });
  };

  console.log(DeviceDimensions);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  // const renderListItem = (itemData) => {
  //   return (
  //     <View style={styles.listItem}>
  //       <ProductItem
  //         style={{
  //           width: 166.365,
  //           height: 255.093,
  //         }}
  //         // cardContainerStyle={side === "right" && { marginLeft: 12 }}
  //         titleStyle={{
  //           fontSize: 18,
  //         }}
  //         onTap={onPressHandler}
  //         id={itemData.item.id}
  //         thumbnail={itemData.item.thumbnail}
  //         title={itemData.item.title}
  //         price={itemData.item.price}
  //         rating={itemData.item.rating}
  //       />
  //     </View>
  //   );
  // };

  const renderListItem = (item, side) => {
    return (
      <View key={item.id} style={styles.listItem}>
        <ProductItem
          style={{
            width: 166.365,
            height: 255.093,
          }}
          cardContainerStyle={side === "right" && { marginLeft: 12 }}
          titleStyle={{
            fontSize: 18,
          }}
          onTap={onPressHandler}
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
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 80 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingLeft: 20 }}>
        <CategoryHeaderText style={{ marginVertical: 10 }}>
          Popular
        </CategoryHeaderText>
        {/* <ProductSlider data={products} onTap={onPress} /> */}
        {isLoading ? (
          <Placeholder Animation={Fade}>
            <View style={{ flexDirection: "row" }}>
              <PlaceholderMedia style={styles.popularProductSkeleton} />
              <PlaceholderMedia style={styles.popularProductSkeleton} />
              <PlaceholderMedia style={styles.popularProductSkeleton} />
            </View>
          </Placeholder>
        ) : (
          <PopularProductsRow
            products={products}
            onPressProduct={onPressHandler}
            onPressSeeMore={onPressSeeMoreHandler}
          />
        )}
        <CategoryHeaderText style={{ marginTop: 40 }}>
          Featured Sellers
        </CategoryHeaderText>
        {isLoading ? (
          <Placeholder Animation={Fade}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <PlaceholderMedia style={styles.featuredSellersProfileSkeleton} />
              <PlaceholderMedia style={styles.featuredSellersProfileSkeleton} />
              <PlaceholderMedia style={styles.featuredSellersProfileSkeleton} />
              <PlaceholderMedia style={styles.featuredSellersProfileSkeleton} />
              <PlaceholderMedia style={styles.featuredSellersProfileSkeleton} />
            </View>
          </Placeholder>
        ) : (
          <FeaturedSellers
            style={{ marginTop: 10 }}
            data={products}
            onOtherUserProfileTapped={(userId) => {
              props.navigation.navigate("Other User Profile", {
                userId,
              });
            }}
          />
        )}
        <CategoryHeaderText style={{ marginTop: 40 }}>
          All Products
        </CategoryHeaderText>
      </View>
      {isLoading ? (
        <SkeletonProductsList />
      ) : (
        <View style={{ flexDirection: "row", paddingLeft: 19 }}>
          <View>{leftArray.map((item) => renderListItem(item, "left"))}</View>
          {/* <FlatList
            data={leftArray}
            renderItem={renderListItem.bind(this, "left")}
          />
          <FlatList
            data={rightArray}
            renderItem={renderListItem.bind(this, "right")}
          /> */}
          <View style={{ marginTop: 40 }}>
            {rightArray.map((item) => renderListItem(item, "right"))}
          </View>
          {/* <FlatList
            numColumns={2}
            data={products.slice(0, 10)}
            renderItem={renderListItem}
          /> */}
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          // setMaximumLength(maximumLength + 10);
          props.navigation.navigate("Products", {
            type: "all category products",
            products: products,
          });
        }}
      >
        <Text
          style={{
            textAlign: "right",
            // "right",
            marginTop: 20,
            marginRight: 20,
            fontFamily: "helvetica-standard",
            color: Colors.primary,
            fontSize: 12,
          }}
        >
          {products.length >= 10 ? "See All" : ""}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 20,
  },

  popularProductSkeleton: {
    width: 150,
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 20,
  },

  featuredSellersProfileSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 20,
  },
});

export const screenOptions = (navData) => {
  const categoryColor = navData.route.params.categoryColor;
  return {
    // headerLeft: () => (
    //   <View style={{ flexDirection: "row", marginLeft: -10 }}>
    //     <HeaderBackButton />
    //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //       <Item
    //         title="Menu"
    //         iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //         onPress={() => {
    //           navData.navigation.toggleDrawer();
    //         }}
    //         color={navData.route.params.categoryColor}
    //       />
    //     </HeaderButtons>
    //   </View>
    // ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          color={categoryColor}
        />
      </HeaderButtons>
    ),
    headerTintColor: categoryColor,
    headerTitle: navData.route.params.title,
    headerTitleStyle: {
      color: categoryColor,
      fontFamily: "helvetica-light",
      fontSize: 20,
      marginLeft: -10,
    },
    headerTitleAlign: "left",
  };
};

export default CategoryScreen;
