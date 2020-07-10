import Card from "../../models/card";

export const STORE_CARDS = "STORE_CARDS";
export const SET_SELECTED_CARD = "SET_SELECTED_CARD";

export const storeCard = (
  cardholderName,
  creditCardNumber,
  expirationDate,
  cvv
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/cards/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardholderName,
          creditCardNumber,
          expirationDate,
          cvv,
        }),
      }
    );

    const responseData = await response.json();

    console.log("STORE CARD RESPONSE:");
    console.log(responseData);
  };
};

export const getCards = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/cards/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let cards = [];

      for (const key in responseData) {
        cards.push(
          new Card(
            key,
            responseData[key].cardholderName,
            responseData[key].creditCardNumber,
            responseData[key].expirationDate,
            responseData[key].cvv
          )
        );
      }

      console.log("GET CARDS:");
      console.log(cards);

      dispatch({
        type: STORE_CARDS,
        cards,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/cards/${userId}/${cardId}.json?auth=${token}`,
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

export const editCard = (
  id,
  cardholderName,
  creditCardNumber,
  expirationDate,
  cvv
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/cards/${userId}/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardholderName,
          creditCardNumber,
          expirationDate,
          cvv,
        }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    let cards = [];

    for (const key in responseData) {
      cards.push(
        new Card(
          key,
          responseData[key].cardholderName,
          responseData[key].creditCardNumber,
          responseData[key].expirationDate,
          responseData[key].cvv
        )
      );
    }

    dispatch({
      type: STORE_CARDS,
      cards,
    });

    console.log("EDIT CARD RESPONSE:");
    console.log(responseData);
  };
};

export const setSelectedCard = (id) => {
  return { type: SET_SELECTED_CARD, id };
};
