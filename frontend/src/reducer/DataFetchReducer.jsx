import React from "react";

export const dataInitialState = {
  microposts: false,
  follow: false,
  messages: false,
  books: false,
  user: false,
}


export const dataReducer = (dataState, action) => {
  switch (action.type) {
    case 'messages':
      return { ...dataState, messages: true }
    case 'microposts':
      return { ...dataState, microposts: true }
    case 'follow':
      return { ...dataState, follow: true }
    case 'books':
      return { ...dataState, books: true }
    case 'user':
      return { ...dataState, user: true }
    case 'complete':
      return dataInitialState
  }
}
