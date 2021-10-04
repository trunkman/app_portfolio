import axios from 'axios'
import { signUp, logIn, logOut, userShow } from '../urls/index'


// ユーザーページを表示するapi
export const fetchUser = (userId) => {
  return axios.get(userShow(userId))
    .then(res => {
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
      console.log(res.data);
      return res.data;
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}

// ログインするためのapi
export const postLogIn = (params) => {
  return axios.post(logIn, {
    session: {
      email: params.email,
      password: params.password,
    },
    withCredentials: true
  })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}

export const deleteLogout = () => {
  return axios.delete(logOut, { withCredentials: true })
}
