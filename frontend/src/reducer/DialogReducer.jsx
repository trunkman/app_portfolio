export const dialogInitialState = {
  signup: false,
  login: false,
  passwordReset: false,
  micropost: false,
  record: false,
  diary: false,
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
    case 'record':
      return { ...openState, record: true }
    case 'diary':
      return { ...openState, diary: true }
    case 'close':
      return dialogInitialState
  }
}
