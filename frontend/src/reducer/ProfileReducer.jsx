export const profileInitialState = {
  fetchState: 'initial',
  reRender: false,
  user: {},
  followingIds: [],
  followersIds: [],
  microposts: [],
  likedMicropostIds: [],
  comments: [],
  commentedMicroposts: [],
}

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
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
        reRender: false,
        microposts: action.payload.microposts,
        likedMicropostIds: action.payload.likedMicropostIds,
        comments: action.payload.comments,
        commentedMicroposts: action.payload.commentedMicroposts,
      };
    case 'reRender':
      return {
        ...state,
        reRender: true,
      };
    default:
      throw new Error();
  }
}
