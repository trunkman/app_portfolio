import React from "react";

export const dataInitialState = {
  microposts: false,
  following: false,
  followers: false,
  messages: false,
  books: false,
}


export const dataReducer = (dataState, action) => {
  switch (action.type) {
    case 'microposts':
      return { ...dataState, microposts: true }
    case 'following':
      return { ...dataState, following: true }
    case 'followers':
      return { ...dataState, followers: true }
    case 'messages':
      return { ...dataState, messages: true }
    case 'books':
      return { ...dataState, books: true }
    case 'complete':
      return dataInitialState
    default:
      return dataInitialState
  }
}
