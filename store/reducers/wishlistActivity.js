import { STORE_WISHLIST_ACTIVITY } from "../actions/wishlistActivity";

const initialState = {
  wishlistActivity: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_WISHLIST_ACTIVITY:
      return { ...state, wishlistActivity: action.wishlistActivity };
    default:
      return state;
  }
};
