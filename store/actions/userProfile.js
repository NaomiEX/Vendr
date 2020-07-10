import User from "../../models/user";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const STORE_USER_TO_DATABASE = "STORE_USER_TO_DATABASE";
export const STORE_USER_DETAILS = "STORE_USER_DETAILS";
export const STORE_ID_TOKEN = "STORE_ID_TOKEN";

// export const storeUserDataToDatabase = (
//   email,
//   username,
//   profilePicture,
//   verified,
//   hashedPassword
// ) => {
//   return async (dispatch, getState) => {
//     const token = getState().authentication.token;
//     const userId = getState().authentication.userId;
//     const response = await fetch(
//       `https://vendr-6265c.firebaseio.com/users.json?auth=${token}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(
//           new User(
//             userId,
//             email,
//             username,
//             profilePicture,
//             verified,
//             hashedPassword
//           )
//         ),
//       }
//     );

//     const responseData = await response.json();
//     console.log("User Stored");
//     console.log(responseData);
//   };
// };

export const storeNewIdToken = (token) => {
  return { type: STORE_ID_TOKEN, token };
};

export const storeProfileData = (
  type,
  email,
  username,
  profilePicture,
  verified,
  hashedPassword
) => {
  return async (dispatch, getState) => {
    switch (type) {
      case "sign up":
        const token = getState().authentication.token;
        const userId = getState().authentication.userId;
        const response = await fetch(
          `https://vendr-6265c.firebaseio.com/users.json?auth=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              new User(
                userId,
                email,
                username,
                profilePicture,
                verified,
                hashedPassword
              )
            ),
          }
        );

        const responseData = await response.json();
        // console.log("User Stored");
        // console.log(responseData);
        // console.log("ID:");
        // console.log(responseData.name);

        dispatch({
          type: STORE_USER_TO_DATABASE,
          id: responseData.name,
        });
    }
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

export const storeProfileDetails = (id, fullName, bio) => {
  return { type: STORE_USER_DETAILS, id, fullName, bio };
};

export const updateProfile = (username, profilePicture, type) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    // console.log("TOKEN::" + token);
    // console.log("UPDATE PROFILE DATA: " + username, profilePicture, type);
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
        const errorResponseData = await response.json();

        console.log(errorResponseData);
        throw new Error("Something went wrong with updating the profile data!");
      }

      const responseData = await response.json();
      // console.log("UPDATEEEEEE RESPONSE DATA:");
      // console.log(responseData);

      dispatch(
        storeProfileData(
          type,
          responseData.email,
          responseData.displayName,
          responseData.photoUrl,
          responseData.emailVerified,
          responseData.passwordHash
        )
      );

      // console.log("user profile:" + responseData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const getProfile = (token) => {
  return async (dispatch, getState) => {
    const userToken = getState().authentication.token;
    // console.log("THE USER TOKEN FROM GET PROFILE:");
    // console.log(userToken);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: userToken,
          }),
        }
      );

      if (!response.ok) {
        const errorResponseData = response.json();
        console.log(errorResponseData);
      }

      const responseData = await response.json();
      // console.log("user profile:" + responseData);
      // console.log("email:");
      // console.log(responseData.users[0].email);

      dispatch(
        storeProfileData(
          "",
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

export const getProfileDetails = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().authentication.userId;
    try {
      const response = await fetch(
        `https://vendr-6265c.firebaseio.com/users.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      // console.log("PROFILE DETAILS!?!?!?: ");
      // console.log(responseData);

      for (const key in responseData) {
        if (responseData[key].uid === userId) {
          // console.log("THE USER ISSSSs:::::::::::");
          // console.log(responseData[key]);
          // console.log("THE KEY IS: " + key);
          dispatch(
            storeProfileDetails(
              key,
              responseData[key].fullName ? responseData[key].fullName : "",
              responseData[key].bio ? responseData[key].bio : ""
            )
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeEmail = (newEmail) => {
  return async (dispatch, getState) => {
    const userToken = getState().authentication.token;
    const verified = getState().userProfile.verified;
    // console.log("CHANGE EMAIL, NEW EMAIL: " + newEmail);
    // console.log("THE USER TOKEN:");
    // console.log(userToken);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: userToken,
            email: newEmail,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();

        const errorId = errorResponseData.error.message;

        let message = "Something went wrong with updating the email data!";

        console.log(errorResponseData);
        if (errorId === "EMAIL_EXISTS") {
          message = "This email has already been taken";
        }
        throw new Error(message);
      }

      const responseData = await response.json();
      // console.log("THE EMAIL CHANGE RESPONSE DATA IS: ");
      // console.log(responseData);

      dispatch(
        storeProfileData(
          "",
          responseData.email,
          responseData.displayName,
          responseData.photoUrl,
          verified,
          responseData.passwordHash
        )
      );

      dispatch(storeNewIdToken(responseData.idToken));
    } catch (err) {
      console.log("THE ERROR IS: ");
      console.log(err);
      throw err;
    }
  };
};

export const editProfile = (email, profilePicture, username, fullName, bio) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().userProfile.id;
    // console.log("EDIT PROFILE!!!!");
    // console.log("USER PROFILE ACTIONS USER ID: " + userId);

    const response = await fetch(
      `https://vendr-6265c.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          profilePicture,
          username,
          fullName,
          bio,
        }),
      }
    );

    if (!response.ok) {
      console.log("RESPONSE IS NOT OK");
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    // console.log("UPDATE USER PROFILE RESPONSE:");
    // console.log(responseData);
    dispatch(storeProfileDetails("", responseData.fullName, responseData.bio));
  };
};

export const changePassword = (newPassword) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userId = getState().userProfile.id;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            password: newPassword,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        console.log("RESPONSE IS NOT OK");
        console.log(errorResponseData);
        throw new Error("The old password you typed is invalid!");
      }

      const responseData = await response.json();
      console.log("change password response data: ");
      console.log(responseData);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
