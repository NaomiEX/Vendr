import moment from "moment";

export const STORE_WISHLIST_ACTIVITY = "STORE_WISHLIST_ACTIVITY";

export const addToWishlistActivity = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    console.log("ADD TO WISHLIST ACTIVITY!!");
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlistActivity.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          date: moment().format("MMMM YYYY"),
        }),
      }
    );

    const responseData = await response.json();
    //   dispatch({
    //     type: ADD_WISHLIST_ACTIVITY,
    //   });
  };
};

export const fetchWishlistActivity = () => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/wishlistActivity.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    // console.log("WISHLIST ACTIVITY: ");
    // console.log(responseData);
    const wishlistActivity = [];

    for (const key in responseData) {
      wishlistActivity.push({
        id: key,
        date: responseData[key].date,
        productId: responseData[key].productId,
        userId: responseData[key].userId,
      });
    }

    // console.log("ALL WISHLIST ACTIVITY: ");
    // console.log(wishlistActivity);

    dispatch({
      type: STORE_WISHLIST_ACTIVITY,
      wishlistActivity,
    });
  };
};
