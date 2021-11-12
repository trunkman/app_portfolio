import React from "react";

export const dialogInitialState = {
  signup: false,
  login: false,
  passwordReset: false,
}


export const dialogReducer = (openState, action) => {
  switch (action.type) {
    case 'signup':
      return { ...openState, signup: true }
    case 'login':
      return { ...openState, login: true }
    case 'passwordReset':
      return { ...openState, login: false, passwordReset: true }
    case 'close':
      return dialogInitialState
    default:
      return dialogInitialState
  }
}
