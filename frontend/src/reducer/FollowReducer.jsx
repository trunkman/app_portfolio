export const followInitialState = {
  fetchState: 'initial',
  following: [],
  followers: [],
  followingIds: [],
  user: {},
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
        user: action.payload.user,
      };
    case 'fetchSuccessFollowers':
      return {
        ...state,
        fetchState: 'ok',
        followers: action.payload.followers,
        user: action.payload.user,
      };
    default:
      throw new Error();
  }
}
