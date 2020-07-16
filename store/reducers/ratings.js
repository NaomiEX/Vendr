import { STORE_RATING_INFO } from "../actions/ratings";

const initialState = {
  ratings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_RATING_INFO:
      return { ...state, ratings: action.ratings };

    default:
      return state;
  }
};
