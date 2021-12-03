export const rankInitialState = {
  fetchState: 'initial',
  sleepHoursRank: [],
  reading: [],
  readBooks: [],
  stackBooks: [],
}

export const rankReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        fetchState: 'loading',
      };
    case 'fetchSuccessSleepHours':
      return {
        ...state,
        fetchState: 'ok',
        sleepHours: action.payload,
      };
    case 'fetchSuccessReading':
      return {
        ...state,
        fetchState: 'ok',
        reading: action.payload,
      };
    case 'fetchSuccessReadBooks':
      return {
        ...state,
        fetchState: 'ok',
        readBooks: action.payload,
      };
    case 'fetchSuccessStackBooks':
      return {
        ...state,
        fetchState: 'ok',
        stackBooks: action.payload,
      };

    default:
      throw new Error();
  }
}
