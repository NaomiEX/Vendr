import { STORE_ORDERS, STORE_ALL_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
  allOrders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case STORE_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.allOrders,
      };

    default:
      return state;
  }
};
