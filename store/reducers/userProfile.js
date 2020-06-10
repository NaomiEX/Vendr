import { UPDATE_PROFILE } from "../actions/userProfile";

const initialState = {
  email: "",
  username: "",
  profilePicture: "",
  verified: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        email: action.email,
        username: action.username,
        verified: action.verified,
      };
    default:
      return state;
  }
};
