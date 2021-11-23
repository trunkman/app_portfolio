export const sleepDebtInitialState = {
  fetchState: 'initial',
  reRender: false,
  sleepDebt: 0,
}


export const sleepDebtReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
      };
    case 'fetchSuccess':
      return {
        ...state,
        fetchState: 'ok',
        sleepDebt: action.payload,
      };
    default:
      throw new Error();
  }
}
