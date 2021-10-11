import axios from 'axios'
import { signUp, logOut, loggedIn, userShow } from '../urls/index'

// ユーザーページを表示するapi
export const fetchUser = (userId) => {
  return axios.get(userShow(userId))
    .then(res => {
      console.log('User画面', res)
      return res.data
    })
    .catch((e) => console.error(e))
}

// 新規登録するためのapi
export const postSignUp = (params) => {
  return axios.post(signUp, {
    user: {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    },
    withCredentials: true // クレデンシャル(クッキー等)の許可
  })
    .then(res => {
      console.log('新規登録', res);
      return res.data;
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}

// ログアウトするapi
export const deleteLogout = () => {
  return axios.delete(logOut, { withCredentials: true })
    .then(res => {
      console.log('ログアウトapi', res)
    })
    .catch(e => {
      console.error(e)
    })
}

// ログイン状態を追跡するapi
export const fetchLoggedIn = () => {
  return axios.get(loggedIn, { withCredentials: true })
    .then(res => {
      console.log('ログイン状況', res)
      return res
    }).catch(error => {
      console.log('ログイン状況エラー', error)
    })
}
