export const bookInitialState = {
  fetchState: 'initial',
  postState: 'initial',
  reRender: false,
  searchBooks: [],
  user: {},
  recommendBook: {},
  readBooks: [],
  stackBooks: [],
}

export const bookReducer = (state, action) => {
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
        user: action.payload.user,
        recommendBook: action.payload.recommendBook,
        readBooks: action.payload.readBooks,
        stackBooks: action.payload.stackBooks,
      };
    case 'posting':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'postSuccess':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        searchBooks: action.payload,
      };
    default:
      throw new Error();
  }
}
