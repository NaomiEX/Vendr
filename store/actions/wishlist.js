import Product from "../../models/product";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const STORE_WISHLIST = "STORE_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";

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

    dispatch({
      type: ADD_TO_WISHLIST,
      productId,
      productName: responseData.name,
    });
  };
};

export const deleteFromWishlist = (productName) => {
  return async (dispatch, getState) => {
    // console.log("REACHED!!");
    // console.log("product name:" + productName);
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlist/${userId}/${productName}.json?auth=${token}`,
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

    dispatch({ type: DELETE_FROM_WISHLIST, productName });
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
