import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../../components/UI/BasicScreen";
import BodyText from "../../components/Text/BodyText";
import SaleProduct from "../../components/UI/SaleProduct";
import SkeletonSaleProduct from "../../components/Skeletons/SkeletonSaleProduct";

import DeviceDimensions from "../../constants/DeviceDimensions";

import * as onSaleActions from "../../store/actions/onSale";

// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };

const SalesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const salesId = props.route.params.id;
  const headerData = props.route.params.headerData;
  // console.log("HEADER DATA: ");
  // console.log(headerData);

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      setIsLoading(true);
      await dispatch(onSaleActions.getOnSale(salesId));
      setIsLoading(false);
    });
  });

  const productsOnSale = useSelector((state) => state.onSale.productsOnSale);

  // console.log("PRODUCTS ON SALE: ");
  // console.log(productsOnSale);

  const renderProduct = (productOnSale) => {
    return (
      <View style={{ marginTop: 50 }} key={productOnSale.key}>
        <SaleProduct
          product={productOnSale.product}
          previousPrice={productOnSale.previousPrice}
          onPressProduct={(id) => {
            props.navigation.navigate("Product Details", {
              id,
            });
          }}
        />
      </View>
    );
  };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);

  //   wait(500).then(() => {
  //     setRefreshing(false);
  //   });
  // }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 60 }}
      // refreshControl={
      //   <RefreshControl refreshing={} />
      // }
    >
      <View>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={{
            width: DeviceDimensions.width,
            height: DeviceDimensions.width / 1.8186,
          }}
          source={headerData.headerBackground}
        >
          <View style={styles.headerRow}>
            <Image source={headerData.headerIcon} />
            <View style={{ marginLeft: DeviceDimensions.width / 20.55 }}>
              <Text style={styles.salesHeader}>{headerData.headerText}</Text>
              <BodyText
                style={{
                  ...styles.salesSubtitle,
                  width: headerData.headerSubtitleWidth,
                }}
              >
                {headerData.headerSubtitle}
              </BodyText>
            </View>
          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: 20 }}>
          {isLoading ? (
            <View>
              <SkeletonSaleProduct />
              <SkeletonSaleProduct />
              <SkeletonSaleProduct />
            </View>
          ) : (
            productsOnSale.map((product) => renderProduct(product))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    marginTop: DeviceDimensions.height / 9.5,
    marginLeft: DeviceDimensions.width / 8.22,
    alignItems: "center",
  },

  salesHeader: {
    fontFamily: "helvetica-bold",
    fontSize: 20,
    color: "white",
  },

  salesSubtitle: {
    color: "white",
    lineHeight: 18,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTintColor: "white",
    headerBackground: () => <View />,
    headerTransparent: true,
    headerTitleStyle: {
      color: "transparent",
    },
  };
};

export default SalesScreen;
