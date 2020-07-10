import { STORE_CARDS, SET_SELECTED_CARD } from "../actions/card";

const initialState = {
  cards: [],
  selectedCard: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_CARDS:
      return {
        ...state,
        cards: action.cards,
      };

    case SET_SELECTED_CARD:
      // console.log("ID PASSED FROM ACTION");
      // console.log(action.id);
      return {
        ...state,
        selectedCard: action.id,
      };

    default:
      return state;
  }
};
