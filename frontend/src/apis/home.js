import axios from 'axios'
import { home } from '../urls/index'

export const fetchHome = () => {
  return axios.get(home)
    .then(res => {
      console.log('Home画面', res)
      return res.data
    })
    .catch((e) => {
      console.error(e)
      alert('メールアドレスまたはパスワードに誤りがあります')
    })
}
