const formatDate = (date) => {
  return (
    date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate()
  )
}

export const recordInitialState = {
  id: '',
  date: formatDate(new Date()),
  sleepingHours: '',
  feeling: 'satisfied',
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
    case 'preUpdate':
      return {
        id: action.payload.id,
        date: action.payload.date,
        sleepingHours: action.payload.sleepingHours,
        feeling: action.payload.feeling,
      };
    default:
      return recordInitialState;
  }
}
