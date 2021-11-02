const DEFAULT_API_LOCALHOST = 'http://54.250.110.27:3000/api/v1'
// StaticPagesController
export const home = `${DEFAULT_API_LOCALHOST}/`;
// UsersController
export const users = `${DEFAULT_API_LOCALHOST}/users`;
export const signUp = `${DEFAULT_API_LOCALHOST}/signup`;
export const userPath = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const userMicroposts = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/microposts`;
export const following = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/following`;
export const followers = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/followers`;
// SessionssController
export const logIn = `${DEFAULT_API_LOCALHOST}/login`;
export const logOut = `${DEFAULT_API_LOCALHOST}/logout`;
export const loggedIn = `${DEFAULT_API_LOCALHOST}/logged_in`;
// MicropostController
export const micropostCreate = `${DEFAULT_API_LOCALHOST}/microposts`;
export const micropostDestroy = (micropostId) => `${DEFAULT_API_LOCALHOST}/microposts/${micropostId}`;
// RelationshipsContoller
export const follow = `${DEFAULT_API_LOCALHOST}/follow`;
export const unfollow = `${DEFAULT_API_LOCALHOST}/unfollow`;
// LikesController
export const like = `${DEFAULT_API_LOCALHOST}/likes`;
export const unlike = (likeId) => `${DEFAULT_API_LOCALHOST}/like/${likeId}`;
