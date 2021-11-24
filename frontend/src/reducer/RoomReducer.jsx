export const roomInitialState = {
  fetchState: 'initial',
  reRender: false,
  entries: [],
  notifications: [],
}

export const roomReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        entries: action.payload,
      };
    default:
      throw new Error();
  }
}
