import { AsyncStorage } from "react-native";
import * as userProfileActions from "./userProfile";
import * as notificationsActions from "./notifications";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
// tried auto logging in
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const VERIFY_EMAIL = "VERIFY_EMAIL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime, isSignIn) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      isSignIn: isSignIn,
    });
  };
};

export const signUp = (email, password, username, formValidity) => {
  return async (dispatch) => {
    let response;
    if (formValidity) {
      response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
    }

    if (formValidity && !response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      // default error message
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message =
          "Too many failed attempts have been made from this device, please try again later.";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is invalid!";
      } else if (errorId === "MISSING_PASSWORD") {
        message = "The password is missing!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "This email is invalid!";
      }
      throw new Error(message);
    }

    if (!formValidity) {
      throw new Error("Please enter the correct data!");
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    // dispatch(verifyEmail(responseData.idToken));

    dispatch(userProfileActions.updateProfile(username, "", "sign up"));

    const expirationDate = new Date(
      // get the current time in seconds from the conception of the language to this moment and add the number of ms until the token expires
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );

    dispatch(
      notificationsActions.storeNotificationsFilters(
        {
          official: true,
          productDiscussion: true,
          transactions: true,
          wishlistChanges: true,
        },
        "filters"
      )
    );
  };
};

export const login = (email, password, formValidity) => {
  return async (dispatch) => {
    let response;
    if (formValidity) {
      response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
    }

    if (formValidity && !response.ok) {
      const errorResponseData = await response.json();
      console.log(errorResponseData);
      const errorId = errorResponseData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is invalid!";
      } else if (errorId === "MISSING_PASSWORD") {
        message = "The password is missing!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "This email is invalid!";
      }

      throw new Error(message);
    }

    if (!formValidity) {
      throw new Error("Please enter the correct data!");
    }

    const responseData = await response.json();

    // console.log(responseData);

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    dispatch(userProfileActions.getProfile(responseData.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const verifyEmail = (token) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();

      console.log(errorResponseData);
    }

    const responseData = await response.json();
    // console.log(responseData);
  };
};

export const resetPassword = () => {
  return async (dispatch, getState) => {
    const email = getState().userProfile.email;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
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
        const errorResponseData = await response.json();
        console.log(errorResponseData);
      }

      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkPassword = (password) => {
  return async (dispatch, getState) => {
    const email = getState().userProfile.email;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrkPG1KbBlYRCW91Can7KNHRsY6RKCdWE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        console.log(errorResponseData);
        const errorId = errorResponseData.error.message;
        let message = "Something went wrong!";
        // console.log("error id");
        // console.log(errorId);

        if (errorId === "INVALID_PASSWORD") {
          // console.log("REACHED!!1");
          message = "The old password you typed in is invalid!";
        } else if (errorId.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
          message = "Too many unsuccessful attempts. Try again later";
        }

        throw new Error(message);
      }

      const responseData = await response.json();
      // console.log("check password response:");
      // console.log(responseData);
      dispatch(userProfileActions.storeNewIdToken(responseData.idToken));
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
