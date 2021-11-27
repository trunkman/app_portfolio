export const notificationInitialState = {
  fetchState: 'initial',
  notifications: [],
}

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'open/fetching':
      return {
        ...state,
        fetchState: 'loading',
      };
    case 'fetchSuccess':
      return {
        fetchState: 'ok',
        notifications: action.payload,
      };
    case 'close':
      return {
        ...state,
        fetchState: 'initial',
      };
    default:
      throw new Error();
  }
}
