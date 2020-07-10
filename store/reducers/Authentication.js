import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
} from "../actions/authentication";
import { STORE_ID_TOKEN } from "../actions/userProfile";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  confirmed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return {
        ...initialState,
        // makes sure that if the user logouts, the app won't try to auto log them back in
        didTryAutoLogin: true,
      };

    case STORE_ID_TOKEN:
      // console.log("STORE NEW ID TOKEN: " + action.token);
      return {
        ...state,
        token: action.token ? action.token : state.token,
      };

    default:
      return state;
  }
};
