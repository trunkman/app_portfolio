export const notificationInitialState = {
  fetchState: 'initial',
  notifications: [],
  checkAll: false,
  checkMessage: false,
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
    case 'check':
      return {
        ...state,
        checkAll: action.payload.checkAll,
        checkMessage: action.payload.checkMessage,
      };
    case 'checkedMessage':
      return {
        ...state,
        checkMessage: false,
      };
    case 'checkedAll':
      return {
        ...state,
        checkAll: false,
      };
    default:
      throw new Error();
  }
}
