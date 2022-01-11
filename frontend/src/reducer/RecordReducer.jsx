// 日付を成形する
const today = new Date();
const formatDate = (date) => {
  return (
    date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2)
  )
}
const todayString = String(formatDate(today));

export const recordInitialState = {
  fetchState: 'initial',
  postState: 'initial',
  id: '',
  date: todayString,
  sleepingHours: '',
  feeling: 'satisfied',
  user: {},
  diaries: [],
}

export const recordReducer = (state, action) => {
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
        user: action.payload.user,
        diaries: action.payload.diaries,
      };
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
