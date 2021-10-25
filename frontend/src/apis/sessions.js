import axios from 'axios'
import { logIn, logOut, loggedIn } from '../urls/index'

// ログインするためのapi
export const postLogIn = (params) => {
  return axios.post(logIn, {
    session: {
      email: params.email,
      password: params.password,
      remember_me: params.remember_me
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data.logged_in) {
        console.log('login', res)
        return res.data
      }
    })
    .catch(e => {
      console.error(e);
      alert('ログイン失敗')
      return 'nil'
    })
}

// ログアウトするapi
export const deleteLogout = () => {
  return axios.delete(logOut, { withCredentials: true })
    .then(res => {
      console.log('logout', res.status)
    })
    .catch(e => {
      console.error(e)
    })
}

// ログイン状態を追跡するapi
export const fetchLoggedIn = () => {
  return axios.get(loggedIn, { withCredentials: true })
    .then(res => {
      console.log('loggedIn', res)
      return res.data
    }).catch(error => {
      console.log('loggedIn', error)
    })
}
