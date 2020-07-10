import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Platform,
  Button,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as productsActions from "../../store/actions/products";
import * as otherUserProfilesActions from "../../store/actions/otherUserProfiles";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import ProductSlider from "../../components/UI/ProductSlider";
import Product from "../../models/product";
import PopularProductsRow from "../../components/PopularProductsRow";
import FeaturedSellers from "../../components/FeaturedSellers";
import ProductItem from "../../components/UI/ProductItem";

const CategoryScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      // dispatch(activeComponentsActions.updateActiveScreen("Home"));
      setIsLoading(true);
      await dispatch(productsActions.fetchProducts());
      await dispatch(otherUserProfilesActions.getOtherProfiles(ownerIds));
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
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

  const renderListItem = (item) => {
    return (
      <View key={item.id} style={styles.listItem}>
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
    >
      <View style={{ paddingLeft: 20 }}>
        <CategoryHeaderText style={{ marginVertical: 10 }}>
          Popular
        </CategoryHeaderText>
        {/* <ProductSlider data={products} onTap={onPress} /> */}
        <PopularProductsRow
          products={products}
          onPressProduct={onPressHandler}
          onPressSeeMore={onPressSeeMoreHandler}
        />
        <CategoryHeaderText style={{ marginTop: 40 }}>
          Featured Sellers
        </CategoryHeaderText>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
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
      <View style={{ flexDirection: "row", paddingLeft: 19 }}>
        <View>{leftArray.map((item) => renderListItem(item))}</View>
        <View style={{ marginTop: 40 }}>
          {rightArray.map((item) => renderListItem(item))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 12,
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
