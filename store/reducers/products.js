import { SET_PRODUCTS, SET_FILTERED_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
  filteredProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      // console.log(state.availableProducts);
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
      };

    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.filteredProducts,
      };

    default:
      return state;
  }
};
