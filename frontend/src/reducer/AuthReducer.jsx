import React from "react";

export const authInitialState = {
  loginUser: {},
  loggedIn: false,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        loginUser: action.payload,
        loggedIn: true,
      }
    case 'logout':
      return {
        loginUser: {},
        loggedIn: false,
      }
    default:
      return authInitialState
  }
}
