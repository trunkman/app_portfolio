import axios from 'axios'
import { signup, login } from '../urls/index'

export const signUp = (params) => {
  return axios.post(signup, {
    user: {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation
    }
  })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch((e) => console.error(e))
}

export const logIn = (params) => {
  return axios.post(login, {
    user: {
      email: params.email,
      password: params.password,
    }
  })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch((e) => console.error(e))
}
