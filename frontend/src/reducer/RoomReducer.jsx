export const followInitialState = {
  fetchState: 'initial',
  reRender: false,
  following: [],
  followers: [],
  followingIds: [],
}

export const followReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'fetchSuccessFollowing':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        following: action.payload.following,
        followingIds: action.payload.followingIds,
      };
    case 'fetchSuccessFollowers':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        followers: action.payload.followers,
        followingIds: action.payload.followingIds,
      };
    default:
      throw new Error();
  }
}
