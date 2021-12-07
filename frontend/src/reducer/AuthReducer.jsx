export const authInitialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  idealSleepingHours: '',
  profile: '',
  rememberMe: '1',
  loginUser: null,
  loggedIn: false,
  // Snackbarの表示に関わる
  show: false,
  type: '',
  message: 'error',
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
      };
    case 'passwordConfirmation':
      return {
        ...state,
        passwordConfirmation: action.payload,
      };
    case 'idealSleepingHours':
      return {
        ...state,
        idealSleepingHours: action.payload,
      };
    case 'profile':
      return {
        ...state,
        profile: action.payload,
      };
    case 'rememberMe':
      return {
        ...state,
        rememberMe: action.payload,
      };
    case 'login':
      return {
        ...state,
        loginUser: action.payload,
        loggedIn: true,
        show: true,
        type: 'success',
        message: 'ログインに成功しました',
      };
    case 'logout':
      return {
        ...state,
        loginUser: '',
        loggedIn: false,
        show: true,
        type: 'info',
        message: 'ログアウトしました',
      };
    case 'deleteUser':
      return {
        ...state,
        loginUser: '',
        loggedIn: false,
        show: true,
        type: 'error',
        message: 'アカウントを削除しました',
      };
    case 'preUpdate':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        passwordConfirmation: action.payload.passwordConfirmation,
        idealSleepingHours: action.payload.idealSleepingHours,
        profile: action.payload.profile,
      };
    case 'reset':
      return {
        ...state,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        rememberMe: '1',
      };
    case 'closeSnackbar':
      return {
        ...state,
        show: false,
        type: '',
        message: '',
      };
    default:
      throw new Error();
  }
}
