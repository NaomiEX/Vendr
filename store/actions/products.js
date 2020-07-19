import Product from "../../models/product";
import Rating from "../../models/rating";
import Views from "../../models/views";

import * as ratingsActions from "./ratings";

import { CATEGORIES } from "../../data/categories";

export const CREATE_PRODUCTS = "CREATE_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const createProduct = (
  title,
  thumbnail,
  price,
  productImages,
  description,
  categories
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    // console.log("CATEGORY TITLES:");
    // console.log(categories);
    // const filteredCategories = CATEGORIES.filter((category) =>
    //   categories.includes(category.title)
    // );
    // console.log("CATEGORIES:");
    // console.log(filteredCategories);
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          thumbnail,
          price,
          productImages,
          description,
          categories,
          rating: new Rating(0, 0, 0),
          views: new Views({}, 0),
          date: new Date(),
        }),
      }
    );

    const responseData = await response.json();
    // console.log("Product Created");
    // console.log(responseData);
  };
};

export const updateProduct = (
  productId,
  title,
  thumbnail,
  price,
  productImages,
  description,
  categories
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          thumbnail,
          price,
          productImages,
          description,
          categories,
          date: new Date(),
        }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    // console.log("UPDATE RESPONSE:");
    // console.log(responseData);
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        "https://vendr-6265c.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].price,
            responseData[key].thumbnail,
            responseData[key].productImages,
            responseData[key].description,
            responseData[key].categories,
            responseData[key].rating,
            responseData[key].views,
            responseData[key].date
          )
        );
      }

      // console.log("FETCH PRODUCTS LOADED PRODUCTS:");
      // console.log(loadedProducts);

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProductDetails = (product, rating) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    let updatedViews;
    let updatedRatings;
    if (!rating) {
      if (product.views.users) {
        if (product.views.users[userId]) {
          updatedViews = {
            ...product.views,
            users: {
              ...product.views.users,
              [userId]: {
                numOfViews: product.views.users[userId].numOfViews + 1,
              },
            },
            totalViews: product.views.totalViews + 1,
          };
        } else {
          updatedViews = {
            ...product.views,
            users: { ...product.views.users, [userId]: { numOfViews: 1 } },
            totalViews: product.views.totalViews + 1,
          };
        }
      } else {
        updatedViews = {
          users: { [userId]: { numOfViews: 1 } },
          totalViews: 1,
        };
      }
    } else {
      let updatedTotal = product.rating.total + rating;
      let updatedNumOfRatings = product.rating.numOfRatings + 1;
      let updatedAverage = updatedTotal / updatedNumOfRatings.toFixed(1);

      // console.log("UPDATED TOTAL: " + updatedTotal);
      // console.log("UPDATED NUM OF RATINGS: " + updatedNumOfRatings);
      // console.log("UPDATED AVERAGE: " + updatedAverage);
      updatedRatings = new Rating(
        updatedAverage,
        updatedTotal,
        updatedNumOfRatings
      );
    }

    // console.log("UPDATED VIEWS:");
    // console.log(updatedViews);

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/products/${product.id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: !rating
          ? JSON.stringify({
              views: updatedViews,
            })
          : JSON.stringify({
              rating: updatedRatings,
            }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    if (rating) {
      dispatch(ratingsActions.storeRatingInfo(userId));
    }

    // console.log("UPDATE PRODUCT DETAILS RESPONSE:");
    // console.log(responseData);
  };
};
