import axios from "axios";
import { messages } from "../urls";

// メッセージを作成するapi
export const postMessage = (params) => {
  return axios.post(messages, {
    message: {
      content: params.content,
      user_id: params.user_id,
      room_id: params.room_id,
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('message#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('message#create', error)
    })
}

// メッセージを削除するapi
// export const deleteMessage = (messageId) => {
//   return axios.delete(messagePath(messageId), { withCredentials: true })
//     .then(res => {
//       console.log('message#destroy', res)
//       alert('メッセージを削除しました')
//       return res.data
//     })
//     .catch(error => {
//       console.log('message#destroy', error)
//     })
// }
