import { UPDATE_PROFILE } from "../actions/userProfile";

const initialState = {
  email: "",
  displayName: "",
  profilePicture: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        email: action.email,
        displayName: action.username,
        profilePicture: action.profilePicture,
      };
    default:
      return state;
  }
};
