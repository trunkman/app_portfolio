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
export const userRooms = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/rooms`;
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
export const unlike = `${DEFAULT_API_LOCALHOST}/unlikes/`;
// CommentController
export const commentCreate = `${DEFAULT_API_LOCALHOST}/comments`;
export const commentDestroy = (commentId) => `${DEFAULT_API_LOCALHOST}/comments/${commentId}`;
// RoomsController
export const rooms = `${DEFAULT_API_LOCALHOST}/rooms`;
export const roomPath = (roomId) => `${DEFAULT_API_LOCALHOST}/rooms/${roomId}`;
// MessagesController
export const messages = `${DEFAULT_API_LOCALHOST}/messages`;
// BooksController
export const books = `${DEFAULT_API_LOCALHOST}/books`;
export const bookPath = (bookId) => `${DEFAULT_API_LOCALHOST}/books/${bookId}`;
