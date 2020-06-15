export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const storeProfileData = (
  email,
  username,
  profilePicture,
  verified,
  hashedPassword
) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE,
      email: email,
      username: username,
      profilePicture: profilePicture,
      verified: verified,
      hashedPassword: hashedPassword,
    });
  };
};

export const updateProfile = (username, profilePicture) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
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

      dispatch(
        storeProfileData(
          responseData.email,
          responseData.displayName,
          responseData.photoUrl,
          responseData.emailVerified,
          responseData.passwordHash
        )
      );

      console.log(responseData);
    } catch (err) {
      console.log(err);
      throw err;
    }
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
      console.log("email:");
      console.log(responseData.users[0].email);
      console.log();

      dispatch(
        storeProfileData(
          responseData.users[0].email,
          responseData.users[0].displayName,
          responseData.users[0].photoUrl,
          responseData.users[0].emailVerified,
          responseData.users[0].passwordHash
        )
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
