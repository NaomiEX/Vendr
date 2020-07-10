import moment from "moment";

import Order from "../../models/order";

import * as cartActions from "./cart";

export const STORE_ORDERS = "STORE_ORDERS";
export const STORE_ALL_ORDERS = "STORE_ALL_ORDERS";

export const storeOrder = (items, total) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;

    const orders = getState().orders.orders;

    let orderId = Math.floor(Math.random() * 1000001);

    const orderIds = [];

    for (const index in orders) {
      orderIds.push(orders[index].orderId);
    }

    console.log("Already existing orderIds:");
    console.log(orderIds);

    while (orderIds.includes(orderId)) {
      orderId = Math.floor(Math.random() * 1000001);
    }

    const date = new Date();

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          orderDate: moment(date).format("MMM Do YYYY, hh:mm a"),
          items,
          total,
        }),
      }
    );

    await dispatch(cartActions.clearCart());

    const responseData = await response.json();

    console.log("STORE ORDER RESPONSE: ");
    console.log(responseData);
  };
};

export const getOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      //   console.log("GET ORDERS RESPONSE:");
      //   console.log(responseData);

      let orders = [];

      for (const key in responseData) {
        orders.push(
          new Order(
            key,
            responseData[key].orderDate,
            responseData[key].orderId,
            responseData[key].items,
            responseData[key].total
          )
        );
      }

      //   console.log("ORDERS:");
      //   console.log(orders);

      // console.log("GET SHIPPING ADDRESS:");
      // console.log(shippingAddress);

      dispatch({
        type: STORE_ORDERS,
        orders,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/orders.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      // console.log("RESPONSE DATA:");
      // console.log(responseData);

      let allOrders = [];

      for (const key in responseData) {
        allOrders.push({
          userId: key,
          orders: responseData[key],
        });
      }

      // console.log("ORDERS:");
      // console.log(allOrders);

      // console.log("GET SHIPPING ADDRESS:");
      // console.log(shippingAddress);

      dispatch({
        type: STORE_ALL_ORDERS,
        allOrders,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
