import {
  STORE_NOTIFICATIONS,
  STORE_NOTIFICATION_FILTERS,
} from "../actions/notifications";

const initialState = {
  notifications: [],
  filters: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_NOTIFICATIONS:
      return { ...state, notifications: action.notifications };

    case STORE_NOTIFICATION_FILTERS:
      return { ...state, filters: action.filters };

    default:
      return state;
  }
};
