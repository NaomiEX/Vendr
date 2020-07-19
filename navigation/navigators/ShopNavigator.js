import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../screens/shop/HomeScreen";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../../screens/shop/SearchScreen";
import CategoriesOverviewScreen from "../../screens/shop/CategoriesOverviewScreen";
import CategoryScreen, {
  screenOptions as categoryScreenOptions,
} from "../../screens/shop/CategoryScreen";
import ProductsScreen, {
  screenOptions as productsScreenOptions,
} from "../../screens/shop/ProductsScreen";
import ProductDetailsScreen, {
  screenOptions as productDetailsScreenOptions,
} from "../../screens/shop/ProductDetailsScreen";
import CartScreen from "../../screens/shop/CartScreen";
import CheckoutScreen from "../../screens/shop/checkout/CheckoutScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../../screens/user/EditProductScreen";
import AddressesScreen from "../../screens/settings/AddressesScreen";
import BillingAddressScreen, {
  screenOptions as billingAddressScreenOptions,
} from "../../screens/settings/BillingAddressScreen";
import ManageCardsScreen, {
  screenOptions as manageCardsScreenOptions,
} from "../../screens/settings/ManageCardsScreen";
import OtherUserProfileScreen from "../../screens/shop/OtherUserProfileScreen";
import EditCardScreen from "../../screens/settings/EditCardScreen";
import SalesScreen, {
  screenOptions as salesScreenOptions,
} from "../../screens/shop/SalesScreen";

import { defaultNavOptions } from "../defaultNavOptions";

const ShopStackNavigator = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ShopStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ShopStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Categories Overview"
        component={CategoriesOverviewScreen}
      />
      <ShopStackNavigator.Screen
        name="Category"
        component={CategoryScreen}
        options={categoryScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Products"
        component={ProductsScreen}
        options={productsScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={productDetailsScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
      <ShopStackNavigator.Screen name="Cart" component={CartScreen} />
      <ShopStackNavigator.Screen name="Checkout" component={CheckoutScreen} />
      <ShopStackNavigator.Screen name="Addresses" component={AddressesScreen} />
      <ShopStackNavigator.Screen
        name="Billing Address"
        component={BillingAddressScreen}
        options={billingAddressScreenOptions}
      />
      <ShopStackNavigator.Screen
        name="Manage Cards"
        component={ManageCardsScreen}
        options={manageCardsScreenOptions}
      />
      <ShopStackNavigator.Screen name="Edit Card" component={EditCardScreen} />
      <ShopStackNavigator.Screen
        name="Other User Profile"
        component={OtherUserProfileScreen}
      />
      <ShopStackNavigator.Screen
        name="Sales"
        component={SalesScreen}
        options={salesScreenOptions}
      />
    </ShopStackNavigator.Navigator>
  );
};
