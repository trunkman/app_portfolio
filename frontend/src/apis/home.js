import axios from 'axios'
import { home, contact } from '../urls/index'

export const fetchHome = () => {
  return axios.get(home)
    .then(res => {
      console.log('home', res)
      return res.data
    })
    .catch(error => {
      console.log('home', error)
    })
}

export const fetchContact = () => {
  return axios.get(contact)
    .then(res => {
      console.log('contact', res)
      return res.data
    })
    .catch(error => {
      console.log('contact', error)
    })
}
