export const profileInitialState = {
  fetchState: 'initial',
  reRender: false,
  user: {},
  followingIds: [],
  followersIds: [],
  microposts: [],
  likedMicroposts: [],
  comments: [],
  commentedMicroposts: [],
}

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'fetchingProfile':
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
      };
    case 'fetchSuccessMicropost':
      return {
        ...state,
        fetchState: 'ok',
        microposts: action.payload.microposts,
        likedMicroposts: action.payload.likedMicroposts,
        comments: action.payload.comments,
        commentedMicroposts: action.payload.commentedMicroposts,
      };
    default:
      throw new Error();
  }
}
