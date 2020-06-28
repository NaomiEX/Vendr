import { SET_OTHER_PROFILES } from "../actions/otherUserProfiles";

const initialState = {
  otherUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OTHER_PROFILES:
      // console.log("OTHER USERS:");
      // console.log(action.otherUsers);
      return {
        ...state,
        otherUsers: action.otherUsers,
      };

    default:
      return state;
  }
};
