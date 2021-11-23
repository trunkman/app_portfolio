export const authInitialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  rememberMe: '1',
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
    case 'preUpdata':
      return {
        ...state,
        name: action.name,
        email: action.email,
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
    default:
      return authInitialState;
  }
}
