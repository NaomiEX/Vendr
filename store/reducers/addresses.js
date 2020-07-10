import {
  STORE_SHIPPING_ADDRESS,
  STORE_BILLING_ADDRESS,
} from "../actions/addresses";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.shippingAddress,
      };

    case STORE_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.billingAddress,
      };

    default:
      return state;
  }
};
