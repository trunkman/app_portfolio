export const sleepDebtInitialState = {
  fetchState: initial,
  sleepDebt: 0,
}

export const sleepDebtReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: loading,
      };
    case 'fetchSucess':
      return {
        fetchState: ok,
        sleepDebt: action.payload,
      };
    default:
      throw new Error();
  }
}
