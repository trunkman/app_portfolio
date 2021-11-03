import axios from "axios";
import { commentCreate, commentDestroy } from "../urls";

// コメントを作成するapi
export const postComment = (params) => {
  return axios.post(commentCreate, {
    comment: {
      content: params.content,
      user_id: params.userId,
      micropost_id: params.micropostId
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('comment#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('comment#create', error)
      return 'nil'
    })
}

// コメントを削除するapi
export const deleteComment = (commentId) => {
  return axios.delete(commentDestroy(commentId), { withCredentials: true })
    .then(res => {
      console.log('comment#destroy', res)
      alert('コメントを削除しました')
      return res.data
    })
    .catch(error => {
      console.log('comment#destroy', error)
    })
}
