import React from "react";

export const loginInitialState = {
  loginUser: {},
  logingIn: false,
}


export const loginReducer = (loginState, action) => {
  switch (action.type) {
    case 'login':
      return { loginUser: action.payload, logingIn: true }
    case 'logout':
      return { loginUser: {}, logingIn: false }
    default:
      return loginInitialState
  }
}
