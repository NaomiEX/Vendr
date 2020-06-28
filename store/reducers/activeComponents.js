import { ACTIVE_SCREEN, ACTIVE_DRAWER } from "../actions/activeComponents";

const initialState = {
  currentScreen: "",
  topScreen: false,
  isDrawerActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_SCREEN:
      return {
        ...state,
        currentScreen: action.title,
        topScreen: action.top,
      };

    case ACTIVE_DRAWER:
      return { ...state, isDrawerActive: action.isDrawerOpen };

    default:
      return state;
  }
};
