import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Screen from "../../components/UI/BasicScreen";
import ProductItem from "../../components/UI/ProductItem";
import TitleText from "../../components/Text/TitleText";
import Divider from "../../components/UI/Divider";

import Colors from "../../constants/Colors";
import DeviceDimensions from "../../constants/DeviceDimensions";

import * as activeComponentsActions from "../../store/actions/activeComponents";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userProducts = useSelector((state) => state.products.userProducts);

  let leftArray = [];
  let rightArray = [];

  // console.log("USER PRODUCTS FROM USER PRODUCTS SCREEN");
  // console.log(userProducts);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      setIsLoading(true);
      await dispatch(
        activeComponentsActions.updateActiveScreen("Your Products", "top")
      );
      await dispatch(productsActions.fetchProducts());
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onPressHandler = (productId) => {
    props.navigation.navigate("Product Details", { id: productId });
  };

  for (const key in userProducts) {
    if (key % 2 === 0) {
      leftArray.push(userProducts[key]);
    } else {
      rightArray.push(userProducts[key]);
    }
  }

  // console.log("ARRAY 1:");
  // console.log(leftArray);
  // console.log("ARRAY 2:");
  // console.log(rightArray);

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

  const Title = (props) => {
    return (
      <View>
        <TitleText style={{ textAlign: "center", color: Colors.primary }}>
          Your Products
        </TitleText>
        <View style={styles.dividerContainer}>
          <Divider dividerStyle={{ width: 45, height: 2 }} />
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Title />
        <View style={{ marginTop: 100 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Screen style={styles.list}>
        <Title />
        {/* <FlatList
        data={userProducts}
        renderItem={renderFlatlistItem.bind(this, onPressHandler)}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 60 }}
      /> */}
        <View style={{ flexDirection: "row", paddingLeft: 19 }}>
          <View>{leftArray.map((item) => renderListItem(item))}</View>
          <View style={{ marginTop: 40 }}>
            {rightArray.map((item) => renderListItem(item))}
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  dividerContainer: { alignItems: "center", marginVertical: 10 },

  list: { flex: 1 },

  listItem: {
    marginTop: 12,
  },
});

export default UserProductsScreen;
