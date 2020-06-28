import { SET_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
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

    default:
      return state;
  }
};
