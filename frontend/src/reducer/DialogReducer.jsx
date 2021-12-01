export const dialogInitialState = {
  signup: false,
  login: false,
  passwordReset: false,
  micropost: false,
  record: false,
  diary: false,
  notification: false,
}


export const dialogReducer = (openState, action) => {
  switch (action.type) {
    case 'signup':
      return { ...openState, signup: true }
    case 'login':
      return { ...openState, login: true }
    case 'passwordReset':
      return { ...openState, login: false, passwordReset: true }
    case 'micropost':
      return { ...openState, micropost: true }
    // 日記を記録するダイアログを開く
    case 'record':
      return { ...openState, record: true }
    // 日記内容を確認するダイアログを開く
    case 'diary':
      return { ...openState, diary: true }
    case 'notification':
      return { ...openState, notification: true }
    case 'close':
      return dialogInitialState;
    default:
      throw new Error();
  }
}
