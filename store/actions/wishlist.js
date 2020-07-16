import Product from "../../models/product";
import moment from "moment";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const STORE_WISHLIST = "STORE_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const STORE_ALL_WISHLIST = "STORE_ALL_WISHLIST";

import * as notificationActions from "./notifications";
import * as wishlistActivity from "./wishlistActivity";

export const addToWishlist = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    // console.log("WISHLIST ACTION PRODUCT ID:");
    // console.log(productId);

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlist/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // categories: product.categories,
          // description: product.description,
          id: productId,
          // productImages: product.productImages,
          // rating: product.rating,
          // thumbnail: product.thumbnail,
          // title: product.title,
        }),
      }
    );

    const responseData = await response.json();
    // console.log("ADDING PRODUCT TO WISHLIST:");
    // console.log(responseData);

    dispatch(wishlistActivity.addToWishlistActivity(productId));

    dispatch({
      type: ADD_TO_WISHLIST,
      productId,
      productName: responseData.name,
    });
  };
};

export const deleteFromWishlist = (wishlistName, productTitle) => {
  return async (dispatch, getState) => {
    // console.log("REACHED!!");
    // console.log("product name:" + wishlistName);
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlist/${userId}/${wishlistName}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log("RESPONSE IS NOT OKAY");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    // console.log("DELETE PRODUCT FROM WISHLIST");
    // console.log(responseData);

    dispatch({ type: DELETE_FROM_WISHLIST, wishlistName });
    dispatch(
      notificationActions.storeNotification(
        "wishlist",
        userId,
        "Vendr_Official",
        `You have removed the product: ${productTitle} from your wishlist`
      )
    );
  };
};

export const fetchWishlist = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlist/${userId}.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    // console.log("FETCH WISHLIST RESPONSE DATA");
    // console.log(responseData);
    const wishlist = [];

    for (const key in responseData) {
      wishlist.push({
        productId: responseData[key].id,
        wishlistName: key,
      });
    }

    // console.log("WISHLIST ARRAY:");
    // console.log(wishlist);

    dispatch({
      type: STORE_WISHLIST,
      wishlist,
    });
  };
};

export const fetchAllWishlist = () => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlist.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    const wishlist = [];

    for (const key in responseData) {
      wishlist.push({
        userId: key,
        wishlist: responseData[key],
      });
    }

    // console.log("ALL WISHLIST: ");
    // console.log(wishlist);

    dispatch({
      type: STORE_ALL_WISHLIST,
      wishlist,
    });
  };
};
