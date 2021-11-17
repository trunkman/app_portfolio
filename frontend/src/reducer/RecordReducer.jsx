export const recordInitialState = {
  date: Date.now(),
  sleepingHours: '',
  feeling: '',
}

export const recordReducer = (state, action) => {
  switch (action.type) {
    case 'date':
      return {
        ...state,
        date: action.payload,
      };
    case 'sleepingHours':
      return {
        ...state,
        sleepingHours: action.payload,
      };
    case 'feeling':
      return {
        ...state,
        feeling: action.payload,
      };
    case 'reset':
      return recordInitialState;
    default:
      return recordInitialState;
  }
}
