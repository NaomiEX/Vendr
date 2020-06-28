import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Platform, Button, Image, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as productsActions from "../../store/actions/products";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";
import CategoryHeaderText from "../../components/Text/CategoryHeaderText";
import ProductSlider from "../../components/UI/ProductSlider";
import Product from "../../models/product";
import PopularProductsRow from "../../components/PopularProductsRow";

const CategoryScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // dispatch(activeComponentsActions.updateActiveScreen("Home"));
      dispatch(productsActions.fetchProducts());
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const categoryTitle = props.route.params.title;

  const products = useSelector(
    (state) => state.products.availableProducts
  ).filter((product) => product.categories.includes(categoryTitle));

  const onPress = (itemId) => {
    props.navigation.navigate("Product Details", {
      id: itemId,
    });
  };

  return (
    <Screen style={{ paddingLeft: 20 }}>
      <CategoryHeaderText style={{ marginVertical: 10 }}>
        Popular
      </CategoryHeaderText>
      {/* <ProductSlider data={products} onTap={onPress} /> */}
      <PopularProductsRow products={products} onPressProduct={onPress} />
    </Screen>
  );
};

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
