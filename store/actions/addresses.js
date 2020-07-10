import ShippingAddress from "../../models/shippingAddress";
import BillingAddress from "../../models/billingAddress";

export const STORE_SHIPPING_ADDRESS = "STORE_SHIPPING_ADDRESS";
export const UPDATE_SHIPPING_ADDRESS = "UPDATE_SHIPPING_ADDRESS";
export const STORE_BILLING_ADDRESS = "STORE_BILLING_ADDRESS";

export const storeShippingAddress = (
  name,
  address,
  city,
  country,
  postalCode
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/addresses/shipping_addresses/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          city,
          country,
          postalCode,
        }),
      }
    );

    const responseData = await response.json();

    console.log("STORE SHIPPING ADDRESS RESPONSE:");
    console.log(responseData);
  };
};

export const getShippingAddress = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/addresses/shipping_addresses/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let shippingAddress;

      for (const key in responseData) {
        shippingAddress = new ShippingAddress(
          key,
          responseData[key].name,
          responseData[key].address,
          responseData[key].city,
          responseData[key].country,
          responseData[key].postalCode
        );
      }

      // console.log("GET SHIPPING ADDRESS:");
      // console.log(shippingAddress);

      dispatch({
        type: STORE_SHIPPING_ADDRESS,
        shippingAddress: shippingAddress,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editShippingAddress = (
  id,
  name,
  address,
  city,
  country,
  postalCode
) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/addresses/shipping_addresses/${userId}/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          city,
          country,
          postalCode,
        }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    dispatch({
      type: STORE_SHIPPING_ADDRESS,
      shippingAddress: new ShippingAddress(
        id,
        name,
        address,
        city,
        country,
        postalCode
      ),
    });

    console.log("EDIT SHIPPING ADDRESS RESPONSE:");
    console.log(responseData);
  };
};

export const storeBillingAddress = (
  name,
  company,
  address,
  city,
  state,
  country,
  phoneNumber
) => {
  return async (dispatch, getState) => {
    console.log("STORE BILLING ADDRESS");
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/addresses/billing_addresses/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          address,
          city,
          state,
          country,
          phoneNumber,
        }),
      }
    );

    const responseData = await response.json();

    console.log("STORE BILLING ADDRESS RESPONSE:");
    console.log(responseData);
  };
};

export const getBillingAddress = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/addresses/billing_addresses/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let billingAddress;

      for (const key in responseData) {
        billingAddress = new BillingAddress(
          key,
          responseData[key].name,
          responseData[key].company,
          responseData[key].address,
          responseData[key].city,
          responseData[key].state,
          responseData[key].country,
          responseData[key].phoneNumber
        );
      }

      // console.log("GET BILLING ADDRESS:");
      // console.log(billingAddress);

      dispatch({
        type: STORE_BILLING_ADDRESS,
        billingAddress,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editBillingAddress = (
  id,
  name,
  company,
  address,
  city,
  state,
  country,
  phoneNumber
) => {
  return async (dispatch, getState) => {
    console.log("EDIT BILLING ADDRESS");
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/addresses/billing_addresses/${userId}/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          address,
          city,
          state,
          country,
          phoneNumber,
        }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    dispatch({
      type: STORE_BILLING_ADDRESS,
      shippingAddress: new BillingAddress(
        id,
        name,
        company,
        address,
        city,
        state,
        country,
        phoneNumber
      ),
    });

    console.log("EDIT BILLING ADDRESS RESPONSE:");
    console.log(responseData);
  };
};
