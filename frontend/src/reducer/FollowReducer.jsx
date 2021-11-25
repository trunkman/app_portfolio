export const followInitialState = {
  fetchState: 'initial',
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
      };
    case 'fetchSuccessFollowing':
      return {
        ...state,
        fetchState: 'ok',
        following: action.payload.following,
        followingIds: action.payload.followingIds,
      };
    case 'fetchSuccessFollowers':
      return {
        ...state,
        fetchState: 'ok',
        followers: action.payload.followers,
        followingIds: action.payload.followingIds,
      };
    default:
      throw new Error();
  }
}
