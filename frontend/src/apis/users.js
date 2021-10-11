import axios from 'axios'
import { signUp, userShow } from '../urls/index'

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
