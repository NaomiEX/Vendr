import {
  STORE_PRODUCT_DISCUSSION,
  STORE_ALL_PRODUCT_DISCUSSION,
} from "../actions/productDiscussion";

const initialState = {
  productDiscussion: [],
  allProductDiscussion: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PRODUCT_DISCUSSION:
      return { ...state, productDiscussion: action.productDiscussion };

    case STORE_ALL_PRODUCT_DISCUSSION:
      return { ...state, allProductDiscussion: action.allProductDiscussion };

    default:
      return state;
  }
};
