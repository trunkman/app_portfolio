import axios from "axios";
import { follow, unfollow } from "../urls";

export const postFollow = (params) => {
  return axios.post(follow, {
    followed_id: params.userId
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('follow#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('follow#create', error)
      return 'nil'
    })
}

export const deleteUnfollow = (params) => {
  return axios.delete(unfollow, {
    followed_id: params.userId
  },
    { withCredentials: true }
  )
    .then(res => {
      console.log('unfollow#destroy', res)
      return res.data
    })
    .catch(error => {
      console.log('unfollow#destroy', error)
    })
}

// フォロー状態を確認するapi
export const fetchFollow = (params) => {
  return axios.get(follow, {
    id: params.userId
  }, { withCredentials: true })
    .then(res => {
      console.log('follow#fetch', res)
      return res.data
    })
    .catch(error => {
      console.log('follow#fetch', error)
    })
}
