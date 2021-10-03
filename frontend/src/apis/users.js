import { getThemeProps } from '@mui/system'
import axios from 'axios'
import { signUp, logIn, usersIndex } from '../urls/index'

export const fetchUsers = () => {
  return axios.get(usersIndex)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const postSignUp = (params, props) => {
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

// export const logIn = (params) => {
//   return axios.post(login, {
//     user: {
//       email: params.email,
//       password: params.password,
//     }
//   })
//     .then(res => {
//       console.log(res.data)
//       return res.data
//     })
//     .catch((e) => console.error(e))
// }
