import { STORE_PRODUCT_DISCUSSION } from "../actions/productDiscussion";

const initialState = {
  productDiscussion: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PRODUCT_DISCUSSION:
      return { ...state, productDiscussion: action.productDiscussion };

    default:
      return state;
  }
};
