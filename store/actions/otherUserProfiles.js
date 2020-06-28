import User from "../../models/user";

export const SET_OTHER_PROFILES = "GET_OTHER_PROFILES";

export const getOtherProfiles = (ownerIds) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        "https://vendr-6265c.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const allUsers = [];

      for (const key in responseData) {
        allUsers.push(
          new User(
            responseData[key].uid,
            responseData[key].email,
            responseData[key].username,
            responseData[key].profilePicture,
            responseData[key].verified,
            responseData[key].hashedPassword
          )
        );
      }

      // console.log("ALL USERS:");
      // console.log(allUsers);

      let filtered = [];
      filtered = allUsers.filter((user) => ownerIds.includes(user.uid));

      // console.log("Filtered users:");
      // console.log(filtered);

      dispatch({
        type: SET_OTHER_PROFILES,
        otherUsers: filtered,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
