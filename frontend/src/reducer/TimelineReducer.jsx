export const timelineInitialState = {
  fetchState: 'initial',
  reRender: false,
  timeline: [],
  liked_micropost_ids: [],
  comments: [],
}

export const timelineReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
        reRender: true,
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: 'ok',
        reRender: false,
        timeline: action.payload.timeline,
        liked_micropost_ids: action.payload.liked_micropost_ids,
        comments: action.payload.comments,
      };
    default:
      throw new Error();
  }
}
