import { STORE_SEARCH_HISTORY } from "../actions/search";

const initialState = {
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_SEARCH_HISTORY:
      console.log("SEARCH HISTORY PASSED FROM ACTION:");
      console.log(action.history);
      return {
        ...state,
        history: action.history,
      };
    default:
      return state;
  }
};
