export const profileInitialState = {
  fetchState: 'initial',
  reRender: false,
  user: {},
  followingIds: [],
  followersIds: [],
  followStatus: false,
  subscriptions: [],
  microposts: [],
  likedMicroposts: [],
  comments: [],
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
        followStatus: action.payload.followStatus,
        subscriptions: action.payload.subscriptions
      };
    case 'fetchSuccessMicropost':
      return {
        ...state,
        fetchState: 'ok',
        microposts: action.payload.microposts,
        likedMicroposts: action.payload.likedMicroposts,
        comments: action.payload.comments,
      };
    default:
      throw new Error();
  }
}
