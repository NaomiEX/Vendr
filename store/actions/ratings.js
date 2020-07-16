import moment from "moment";

export const STORE_RATING_INFO = "STORE_RATING_INFO";

export const storeRatingInfo = (user) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/ratingsInfo/${user}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: moment().format("MMMM YYYY"),
        }),
      }
    );

    const responseData = await response.json();
    // console.log("Product Created");
    // console.log(responseData);
  };
};

export const getRatingInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        "https://vendr-6265c.firebaseio.com/ratingsInfo.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      //   console.log(responseData);
      const ratings = [];

      for (const key in responseData) {
        ratings.push({
          user: key,
          userRatings: responseData[key],
        });
      }

      //   console.log("RATINGS: ");
      //   console.log(ratings);

      dispatch({
        type: STORE_RATING_INFO,
        ratings,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
