export const sleepDebtInitialState = {
  fetchState: initial,
  reRender: false,
  sleepDebt: 0,
}

export const sleepDebtReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: loading,
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: ok,
        sleepDebt: action.payload,
      };
    default:
      throw new Error();
  }
}



export const profileInitialState = {
  fetchState: initial,
  reRender: false,
  user: null,
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
        fetchState: loading,
      };
    case 'fetchProfileSuccess':
      return {
        ...state,
        fetchState: ok,
        reRender: false,
        user: action.payload.user,
        followingIds: action.payload.followingIds,
        followersIds: action.payload.followiweaIds,
      };
    case 'fetchMicropostSuccess':
      return {
        ...state,
        fetchState: ok,
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
