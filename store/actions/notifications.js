import moment from "moment";

import Notification from "../../models/notification";

export const STORE_NOTIFICATIONS = "STORE_NOTIFICATIONS";
export const STORE_DISCUSSION = "STORE_DISCUSSION";
export const STORE_NOTIFICATION_FILTERS = "STORE_NOTIFICATION_FILTERS";

export const storeNotification = (type, receiverId, senderId, message) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    await dispatch(getNotificationFilters("filters"));

    const notificationFilters = getState().notifications.filters;
    let storeNotification = true;
    switch (type) {
      case "wishlist":
        if (!notificationFilters.wishlistChanges) {
          storeNotification = false;
        }

      case "product discussion post":
        if (!notificationFilters.productDiscussion) {
          storeNotification = false;
        }

      case "transaction":
        if (!notificationFilters.transactions) {
          storeNotification = false;
        }
    }

    console.log("FLTRS FROM STORE NOTIFICATION:");
    console.log(notificationFilters);
    const official = ["official", "transaction", "wishlist"];
    let sender = senderId;

    if (!official.includes(type)) {
      sender = userId;
    }

    if (storeNotification) {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/notifications/${receiverId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            sender,
            message,
            date: moment().format("DD MMMM YYYY-hh:mm a"),
          }),
        }
      );

      const responseData = await response.json();
    }

    // console.log("STORE NOTIFICATION RESPONSE: ");
    // console.log(responseData);
  };
};

export const getNotifications = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/notifications/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let notifications = [];

      for (const key in responseData) {
        notifications.push(
          new Notification(
            key,
            responseData[key].type,
            responseData[key].sender,
            responseData[key].message,
            responseData[key].date
          )
        );
      }

      //   console.log("NOTIFICATIONS:");
      //   console.log(notifications);

      dispatch({
        type: STORE_NOTIFICATIONS,
        notifications: notifications.reverse(),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteNotification = (notificationId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/notifications/${userId}/${notificationId}.json?auth=${token}`,
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

export const wishlistChanges = (productId, productTitle) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/wishlist.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let users = [];

      for (const key in responseData) {
        for (const index in responseData[key]) {
          responseData[key][index].id === productId && users.push(key);
        }
      }

      console.log("USERS LIST:");
      console.log(users);

      for (const key in users) {
        dispatch(
          storeNotification(
            "wishlist",
            users[key],
            "Vendr_Official",
            `The product: ${productTitle} in your wishlist has been editted`
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const storeNotificationsFilters = (filters, key) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/notificationFilters/${userId}/${key}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      }
    );

    const responseData = await response.json();

    console.log("STORE NOTIFICATION FILTERS RESPONSE: ");
    console.log(responseData);
  };
};

export const deleteNotificationFilters = (notificationFiltersId) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/notificationFilters/${userId}/${notificationFiltersId}.json?auth=${token}`,
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

export const getNotificationFilters = (name) => {
  return async (dispatch, getState) => {
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/notificationFilters/${userId}/${name}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      console.log("NOTIFICATION FILTERS GET FROM FIREBASE:");
      console.log(responseData);

      // let notificationFilters;

      // for (const key in responseData) {
      //   notificationFilters = {
      //     key,
      //     official: responseData[key].official,
      //     productDiscussion: responseData[key].productDiscussion,
      //     transactions: responseData[key].transactions,
      //     wishlishtChanges: responseData[key].wishlistChanges,
      //   };
      // }

      // console.log("NOTIFICATION FILTERS:");
      // console.log(notificationFilters);

      dispatch({
        type: STORE_NOTIFICATION_FILTERS,
        filters: responseData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
