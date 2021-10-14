import axios from 'axios'
import { signUp, userPath } from '../urls/index'

// ユーザーページを表示するapi
export const fetchUser = (userId) => {
  return axios.get(userPath(userId))
    .then(res => {
      console.log('user#show', res)
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
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data.logged_in) {
        console.log('signup/user#create', res);
        return res.data;
      }
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}

// ユーザー情報更新のapi
export const patchUpdate = (params) => {
  return axios.patch(userPath(params.user_id), {
    user: {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('user#update', res);
        return res.data;
      }
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}
