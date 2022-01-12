export const profileInitialState = {
  fetchState: 'initial',
  reRender: false,
  user: {},
  followingIds: [],
  followersIds: [],
  followStatus: false,
  readBooks: [],
  stackBooks: [],
  microposts: [],
  likedMicroposts: [],
  comments: [],
}

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'fetchSuccessProfile':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        user: action.payload.user,
        followingIds: action.payload.followingIds,
        followersIds: action.payload.followersIds,
        followStatus: action.payload.followStatus,
        readBooks: action.payload.readBooks,
        stackBooks: action.payload.stackBooks,
      };
    case 'fetchSuccessMicropost':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        microposts: action.payload.microposts,
        likedMicroposts: action.payload.likedMicroposts,
        comments: action.payload.comments,
      };
    default:
      throw new Error();
  }
}
