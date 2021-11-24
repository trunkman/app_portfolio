import axios from "axios";
import { relationships, relationshipPath } from "../urls";

export const postFollow = (params) => {
  return axios.post(relationships, {
    followed_id: params.userId
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('relationships#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('relationships#create', error)
      return 'nil'
    })
}

export const deleteUnfollow = (params) => {
  return axios.delete(relationshipPath(params.userId), {
    withCredentials: true
  }).then(res => {
    console.log('relationships#destroy', res)
    return res.data
  }).catch(error => {
    console.log('relationships#destroy', error)
  })
}
