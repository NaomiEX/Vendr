import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
} from "../actions/authentication";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
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

    default:
      return state;
  }
};
