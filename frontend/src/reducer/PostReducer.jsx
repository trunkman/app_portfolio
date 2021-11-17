export const postInitialState = {
  content: '',
}

export const postReducer = (state, action) => {
  switch (action.type) {
    case 'content':
      return {
        content: action.payload,
      };
    case 'reset':
      return {
        content: '',
      };
    default:
      return postInitialState;
  }
}
