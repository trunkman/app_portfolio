// let DEFAULT_API_LOCALHOST = null
// if (process.env.NODE_ENV === 'development') {
//   DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'
// } else if (process.env.REACT_APP_ENV === 'test') {
//   DEFAULT_API_LOCALHOST = 'http://test.sleepingdebtplan.com/api/v1'
// } else {
//   DEFAULT_API_LOCALHOST = 'https://sleepingdebtplan.com/api/v1'
// }

const DEFAULT_API_LOCALHOST = process.env.NODE_ENV == 'development'
  ? 'http://localhost:3000/api/v1'
  : 'http://test.sleepingdebtplan.com/api/v1'

// StaticPagesController
export const home = `${DEFAULT_API_LOCALHOST}/`;
export const contact = `${DEFAULT_API_LOCALHOST}/`; //未使用
// SessionssController
export const login = `${DEFAULT_API_LOCALHOST}/login`;
export const logout = `${DEFAULT_API_LOCALHOST}/logout`;
export const loggedIn = `${DEFAULT_API_LOCALHOST}/logged_in`;
// UsersController
export const users = `${DEFAULT_API_LOCALHOST}/users`;
export const signup = `${DEFAULT_API_LOCALHOST}/signup`;
export const userPath = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`;
export const userMicroposts = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/microposts`;
export const following = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/following`;
export const followers = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/followers`;
export const userDiaries = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/diaries`;
export const userTimeline = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/timeline`;
export const userBooks = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/books`;
export const userRooms = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/rooms`;
export const userRanking = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}/ranking`;
// AccountActivationController
export const accountActivationPath = (activationToken, queryEmail) => `${DEFAULT_API_LOCALHOST}/account_activations/${activationToken}/edit?email=${queryEmail}`;
// PasswordResetController
export const passwordResets = `${DEFAULT_API_LOCALHOST}/password_resets`;
export const passwordResetPath = (passwordResetToken) => `${DEFAULT_API_LOCALHOST}/password_resets/${passwordResetToken}`;
// RelationshipsContoller
export const relationships = `${DEFAULT_API_LOCALHOST}/relationships`;
export const relationshipPath = (userId) => `${DEFAULT_API_LOCALHOST}/relationships/${userId}`;
// MicropostController
export const microposts = `${DEFAULT_API_LOCALHOST}/microposts`;
export const micropostPath = (micropostId) => `${DEFAULT_API_LOCALHOST}/microposts/${micropostId}`;
// LikesController
export const like = `${DEFAULT_API_LOCALHOST}/likes`;
export const unlike = `${DEFAULT_API_LOCALHOST}/unlikes/`;
// CommentController
export const comments = `${DEFAULT_API_LOCALHOST}/comments`;
export const commentPath = (commentId) => `${DEFAULT_API_LOCALHOST}/comments/${commentId}`;
// DiarisController
export const diaries = `${DEFAULT_API_LOCALHOST}/diaries`;
export const diaryPath = (diaryId) => `${DEFAULT_API_LOCALHOST}/diaries/${diaryId}`;
export const sleepDebt = (userId) => `${DEFAULT_API_LOCALHOST}/sleep_debt/${userId}`;
// BooksController
export const books = `${DEFAULT_API_LOCALHOST}/books`;
export const bookPath = (bookIsbn) => `${DEFAULT_API_LOCALHOST}/books/${bookIsbn}`;
export const bookSearch = `${DEFAULT_API_LOCALHOST}/book_search`;
// RoomsController
export const rooms = `${DEFAULT_API_LOCALHOST}/rooms`;
export const roomPath = (roomId) => `${DEFAULT_API_LOCALHOST}/rooms/${roomId}`;
// MessagesController
export const messages = `${DEFAULT_API_LOCALHOST}/messages`;
export const messagePath = (messageId) => `${DEFAULT_API_LOCALHOST}/messages/${messageId}`;
// RecommendsController
export const recommends = `${DEFAULT_API_LOCALHOST}/recommends`;
export const recommendPath = (bookId) => `${DEFAULT_API_LOCALHOST}/recommends/${bookId}`;
// NotificationsController
export const notifications = `${DEFAULT_API_LOCALHOST}/notifications`;
export const notificationsDelete = `${DEFAULT_API_LOCALHOST}/notifications/all_delete`;
export const notificationsCheck = `${DEFAULT_API_LOCALHOST}/notifications/check`;
// RankingsController
export const sleepingHours = `${DEFAULT_API_LOCALHOST}/rankings/sleeping_hours`;
export const reading = `${DEFAULT_API_LOCALHOST}/rankings/reading`;
export const readBooks = `${DEFAULT_API_LOCALHOST}/rankings/read_books`;
export const stackBooks = `${DEFAULT_API_LOCALHOST}/rankings/stack_books`;
// ImagesController;
export const avatar = `${DEFAULT_API_LOCALHOST}/images/avatar`;
export const micropost = `${DEFAULT_API_LOCALHOST}/images/micropost`;
