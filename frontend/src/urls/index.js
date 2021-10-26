const DEFAULT_API_LOCALHOST = 'http://54.250.110.27:3000/api/v1'

// StaticPagesController
export const home = `${DEFAULT_API_LOCALHOST}/`;

// UsersController
export const signUp = `${DEFAULT_API_LOCALHOST}/signup`;
export const userPath = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const users = `${DEFAULT_API_LOCALHOST}/users`;
// SessionssController
export const logIn = `${DEFAULT_API_LOCALHOST}/login`;
export const logOut = `${DEFAULT_API_LOCALHOST}/logout`;
export const loggedIn = `${DEFAULT_API_LOCALHOST}/logged_in`;
// MicropostController
export const micropostCreate = `${DEFAULT_API_LOCALHOST}/microposts`;
export const micropostDestroy = (micropostId) => `${DEFAULT_API_LOCALHOST}/microposts/${micropostId}`;
