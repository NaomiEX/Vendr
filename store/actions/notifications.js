import moment from "moment";
import User from "../../models/user";

import Notification from "../../models/notification";
import * as otherUserProfilesActions from "./otherUserProfiles";

export const STORE_NOTIFICATIONS = "STORE_NOTIFICATIONS";
export const STORE_DISCUSSION = "STORE_DISCUSSION";

export const storeNotification = (type, receiverId, senderId, message) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    const official = ["official", "transaction", "wishlist"];
    let sender = senderId;

    if (!official.includes(type)) {
      sender = userId;
    }

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

    console.log("STORE NOTIFICATION RESPONSE: ");
    console.log(responseData);
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
        notifications,
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
