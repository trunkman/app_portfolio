import axios from "axios";
import { micropostCreate, micropostDestroy } from "../urls";

export const postMicropost = (params) => {
  return axios.post(micropostCreate, {
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
  return axios.delete(micropostDestroy(micropostId), { withCredentials: true })
    .then(res => {
      console.log('micropost#destroy', res)
      alert('投稿を削除しました')
      return res.data
    })
    .catch(error => {
      console.log('micropost#destroy', error)
    })
}
