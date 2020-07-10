export const STORE_PRODUCT_DISCUSSION = "STORE_PRODUCT_DISCUSSION";

export const storeProductDiscussion = (
  type,
  productId,
  repliedMessageInfo,
  message
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const profilePicture = getState().userProfile.profilePicture;
    const username = getState().userProfile.username;

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/productDiscussion/${productId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          senderId: userId,
          repliedMessageInfo,
          senderProfilePicture: profilePicture,
          senderUsername: username,
          message,
        }),
      }
    );

    const responseData = await response.json();

    console.log("STORE PRODUCT DISCUSSION RESPONSE: ");
    console.log(responseData);
  };
};

export const getProductDiscussion = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/productDiscussion/${productId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      //   console.log("GET PRODUCT DISCUSSION RESPONSE DATA: ");
      //   console.log(responseData);

      let productDiscussion = [];

      for (const key in responseData) {
        productDiscussion.push({
          key,
          message: responseData[key].message,
          senderId: responseData[key].senderId,
          repliedMessageInfo: responseData[key].repliedMessageInfo,
          senderProfilePicture: responseData[key].senderProfilePicture,
          senderUsername: responseData[key].senderUsername,
          type: responseData[key].type,
        });
      }

      console.log("PRODUCT DISCUSSION:");
      console.log(productDiscussion);

      dispatch({
        type: STORE_PRODUCT_DISCUSSION,
        productDiscussion,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
