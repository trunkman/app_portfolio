import axios from "axios";
import { microposts, micropostPath } from "../urls";

// マイクロポストを作成するapi
export const postMicropost = (params) => {
  return axios.post(microposts, {
    micropost: {
      content: params.content,
      user_id: params.user_id,
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('micropost#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('micropost#create', error)
      return 'nil'
    })
}

// マイクロポストを削除するapi
export const deleteMicropost = (micropostId) => {
  return axios.delete(micropostPath(micropostId), {
    withCredentials: true
  }).then(res => {
    console.log('micropost#destroy', res)
    alert('投稿を削除しました')
    return res.data
  }).catch(error => {
    console.log('micropost#destroy', error)
  })
}

// いいねの状態を確認するapi
export const fetchLikedMicropost = (micropostId) => {
  return axios.get(micropostPath(micropostId), {
    withCredentials: true
  }).then(res => {
    console.log('micropost#liked_micropost', res)
    return res.data
  }).catch(error => {
    console.log('micropost#liked_micropost', error)
  })
}
