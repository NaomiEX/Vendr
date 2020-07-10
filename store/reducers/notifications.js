import {
  STORE_NOTIFICATIONS,
  STORE_DISCUSSION,
} from "../actions/notifications";

const initialState = {
  notifications: [],
  discussion: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_NOTIFICATIONS:
      return { ...state, notifications: action.notifications };

    case STORE_DISCUSSION:
      // console.log("DISCUSSION PASSED FROM ACTION: ");
      // console.log(action.discussion);
      return { ...state, discussion: action.discussion };

    default:
      return state;
  }
};
