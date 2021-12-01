// 日付を整える
const formatDate = (date) => {
  return (
    date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate()
  )
}

export const recordInitialState = {
  fetchState: 'initial',
  postState: 'initial',
  id: '',
  // 本日の日付が表示されない
  date: formatDate(new Date()),
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
