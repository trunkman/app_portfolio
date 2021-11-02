import axios from 'axios'
import { signUp, userPath, users, userMicroposts, following } from '../urls/index'

// ユーザーページを表示するapi
export const fetchUser = (params) => {
  return axios.get(userPath(params.userId), {
    user: { id: params.userId }
  }, { withCredentials: true })
    .then(res => {
      console.log('user#show', res)
      return res.data
    }).catch((e) => console.error(e))
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

// ユーザー一覧を表示するapi
export const fetchUsers = () => {
  return axios.get(users, { withCredentials: true })
    .then(res => {
      console.log('user#index', res)
      return res.data
    })
    .catch(e => { console.error(e) })
}

// ユーザーを削除する
export const deleteUser = (userId) => {
  return axios.delete(userPath(userId), { withCredentials: true })
    .then(res => {
      console.log('user#destroy', res)
      return res.data
    })
    .catch(e => { console.error(e) })
}

// 投稿一覧を取得するapi
export const fetchMicroposts = (params) => {
  return axios.get(userMicroposts(1), {
    user: { id: params.userId }
  }, { withCredentials: true })
    .then(res => {
      console.log('users#microposts', res)
      return res.data
    })
    .catch(error => {
      console.log('users#microposts', error)
    })
}

// Folloingをfetchする ※cookieが送れない問題あり
export const fetchFollowing = (params) => {
  return axios.get(following(1), {
    user: { id: params.userId }
  }, { withCredentials: true })
    .then(res => {
      console.log('user#following', res)
      return res.data
    })
    .catch(e => console.log(e))
}

// // Followersをfetchする
// export const fetchFollowers = (params) => {
//   return axios.get(followers(params.userId), {
//     user: { id: params.userId }
//   }, { withCredentials: true })
//     .then(res => {
//       console.log('user#followers', res)
//       return res.data
//     })
//     .catch(e => { console.error(e) })
// }
