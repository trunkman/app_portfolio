import axios from 'axios'
import { signUp, logIn, usersIndex } from '../urls/index'

export const fetchUsers = () => {
  return axios.get(usersIndex)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const postSignUp = (params) => {
  return axios.post(signUp, {
    user: {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    }
  })
    .then(res => {
      console.log(res.data);
      alert('送信完了しました');
      return res.data;
    })
    .catch(e => {
      alert('送信が失敗しました');
      console.error(e);
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
