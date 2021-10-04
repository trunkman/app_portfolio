const DEFAULT_API_LOCALHOST = 'http://54.250.110.27:3000/api/v1'

export const home = `${DEFAULT_API_LOCALHOST}/`;
export const signUp = `${DEFAULT_API_LOCALHOST}/signup`;
export const logIn = `${DEFAULT_API_LOCALHOST}/login`;
export const logOut = `${DEFAULT_API_LOCALHOST}/logout`;
export const userShow = (userId) =>
  `${DEFAULT_API_LOCALHOST}/users/${userId}`;

