import axios from 'axios'
import { logIn, logOut, loggedIn } from '../urls/index'

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
      if (res.data.logged_in) {
        console.log('ログイン', res)
        return res.data
      }
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}
