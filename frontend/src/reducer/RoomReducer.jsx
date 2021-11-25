export const roomInitialState = {
  fetchState: 'initial',
  entries: [],
  notifications: [],
}

export const roomReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: 'ok',
        entries: action.payload,
      };
    default:
      throw new Error();
  }
}
