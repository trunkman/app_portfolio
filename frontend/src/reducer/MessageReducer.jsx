export const messageInitialState = {
  fetchState: 'initial',
  reRender: false,
  messages: [],
}

export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'fetchSuccess':
      return {
        fetchState: 'ok',
        reRender: false,
        messages: action.payload,
      };
    default:
      throw new Error();
  }
}
