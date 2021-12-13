export const dialogInitialState = {
  signup: false,
  login: false,
  passwordReset: false,
  micropost: false,
  tweet: false,
  record: false,
  diary: false,
  notification: false,
  delete: false,
}


export const dialogReducer = (openState, action) => {
  switch (action.type) {
    case 'signup':
      return { ...openState, signup: true }
    case 'login':
      return { ...openState, login: true }
    case 'passwordReset':
      return { ...openState, login: false, passwordReset: true }
    // マイクロポストを表示するダイアログを開く
    case 'micropost':
      return { ...openState, micropost: true, notification: false }
    // マイクロポストを投稿するダイアログを開く
    case 'tweet':
      return { ...openState, tweet: true }
    // 日記を記録するダイアログを開く
    case 'record':
      return { ...openState, record: true }
    // 日記内容を表示するダイアログを開く
    case 'diary':
      return { ...openState, diary: true }
    case 'notification':
      return { ...openState, notification: true }
    // 削除確認ダイアログを開く
    case 'delete':
      return { ...openState, delete: true }
    case 'close':
      return dialogInitialState;
    default:
      throw new Error();
  }
}
