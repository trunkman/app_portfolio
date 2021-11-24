export const bookInitialState = {
  fetchState: 'initial',
  postState: 'initial',
  reRenderFetch: false,
  reRenderPost: false,
  searchBooks: [],
  readBooks: [],
  stackBooks: [],
}

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRenderFetch: true,
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: 'ok',
        reRenderFetch: false,
        readBooks: action.payload.readBooks,
        stackBooks: action.payload.stackBooks,
      };
    case 'posting':
      return {
        ...state,
        fetchState: 'loading',
        reRenderPost: true,
      };
    case 'postSuccess':
      return {
        ...state,
        fetchState: 'ok',
        reRenderPost: false,
        searchBooks: action.payload,
      };
    default:
      throw new Error();
  }
}
