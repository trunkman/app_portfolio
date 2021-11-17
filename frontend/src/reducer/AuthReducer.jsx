export const authInitialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  rememberMe: '1',
  openSignup: false,
  openLogin: false,
  openPasswordReset: false,
  loginUser: '',
  loggedIn: false,
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
    case 'rememberMe':
      return {
        ...state,
        rememberMe: action.payload,
      };
    case 'openSignup':
      return {
        ...state,
        openSignup: true,
      };
    case 'openLogin':
      return {
        ...state,
        openLogin: true
      };
    case 'openPasswordReset':
      return {
        ...state,
        openLogin: false,
        openPasswordReset: true,
      };
    case 'login':
      return {
        ...state,
        loginUser: action.payload,
        loggedIn: true,
      };
    case 'logout':
      return {
        ...state,
        loginUser: '',
        loggedIn: false,
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
    case 'close':
      return {
        ...state,
        openSignup: false,
        openLogin: false,
        openPasswordReset: false,
      };
    default:
      return authInitialState;
  }
}
