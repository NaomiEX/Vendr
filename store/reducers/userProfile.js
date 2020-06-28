import {
  UPDATE_PROFILE,
  STORE_USER_TO_DATABASE,
  STORE_USER_DETAILS,
} from "../actions/userProfile";

const initialState = {
  id: "",
  email: "",
  username: "",
  profilePicture: "",
  verified: false,
  hashedPassword: "",
  fullName: "",
  bio: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_TO_DATABASE:
      // console.log("ACTION ID:");
      // console.log(action.id);
      return {
        ...state,
        id: action.id,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        email: action.email,
        username: action.username,
        verified: action.verified,
        hashedPassword: action.hashedPassword,
        profilePicture: action.profilePicture,
      };

    case STORE_USER_DETAILS:
      // console.log(
      //   "STORE_USER_DETAILS: " +
      //     action.id +
      //     " " +
      //     action.fullName +
      //     " " +
      //     action.bio
      // );
      return {
        ...state,
        id: action.id === "" ? state.id : action.id,
        fullName: action.fullName,
        bio: action.bio,
      };
    default:
      return state;
  }
};
