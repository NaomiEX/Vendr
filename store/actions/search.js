export const STORE_SEARCH_HISTORY = "STORE_SEARCH_HISTORY";

import Search from "../../models/searchHistory";

export const storeSearch = (search) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const searchHistory = getState().search.history;
    // console.log("SEARCH HISTORY FROM storeSearch: ");
    // console.log(searchHistory);

    // const searchHistory = getState
    if (searchHistory.length > 9) {
      dispatch(deleteSearchHistory(searchHistory[0].id));
    }

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/search/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      }
    );

    const responseData = await response.json();

    // console.log("STORE SEARCH RESPONSE");
    // console.log(responseData);
  };
};

export const getSearchHistory = () => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/search/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let searchHistory = [];
      for (const key in responseData) {
        searchHistory.push(new Search(key, responseData[key].search));
      }
      // console.log("THE SEARCH HISTORY RESPONSE:");
      // console.log(searchHistory);

      dispatch({
        type: STORE_SEARCH_HISTORY,
        history: searchHistory,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteSearchHistory = (searchHistoryName) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/search/${userId}/${searchHistoryName}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log("RESPONSE IS NOT OKAY");
      throw new Error("Something went wrong!");
    }
  };
};
