export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_PROFILE = "GET_PROFILE";

export const updateProfile = (username, profilePicture) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    console.log(token);
    console.log("Hello there");
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: username,
            photoUrl: profilePicture,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      console.log(responseData);
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: UPDATE_PROFILE,
      email: responseData.email,
      username: responseData.displayName,
      profilePicture: responseData.photoUrl,
    });
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
          }),
        }
      );

      if (!response.ok) {
        const errorResponseData = response.json();
        console.log(errorResponseData);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
