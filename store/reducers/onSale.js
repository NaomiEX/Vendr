import { STORE_PRODUCTS_ON_SALE } from "../actions/onSale";

const initialState = {
  productsOnSale: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PRODUCTS_ON_SALE:
      return {
        ...state,
        productsOnSale: action.productsOnSale,
      };

    default:
      return state;
  }
};
