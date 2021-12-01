export const sleepDebtInitialState = {
  fetchState: 'initial',
  reRender: false,
  sleepDebt: null,
  sleepSaving: null,
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
        sleepDebt: action.payload.sleepDebt,
        sleepSaving: action.payload.sleepSaving,
      };
    default:
      throw new Error();
  }
}
