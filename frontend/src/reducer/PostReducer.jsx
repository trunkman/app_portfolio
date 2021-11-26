export const postInitialState = {
  fetchState: 'initial',
  postState: 'initial',
  content: '',
  micropost: {},
  comments: [],
  likeStatus: false,
}

export const postReducer = (state, action) => {
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
        micropost: action.payload.micropost,
        comments: action.payload.comments,
        likeStatus: action.payload.likeStatus,
      };
    case 'input':
      return {
        ...state,
        content: action.payload,
      };
    case 'posting':
      return {
        ...state,
        postState: 'loading',
      };
    case 'postSuccess':
      return {
        ...state,
        postState: 'ok',
        content: '',
      };
    default:
      throw new Error();
  }
}
