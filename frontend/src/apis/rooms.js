import axios from "axios";
import { rooms, roomPath } from "../urls";

// ルームのメッセージ一覧を取得するapi
export const fetchMessages = (params) => {
  return axios({
    method: 'get',
    baseURL: roomPath(params.roomId),
    data: { room: { id: params.roomId } },
    withCredentials: true,
  }).then(res => {
    console.log('rooms#show', res)
    return res.data
  }).catch(error => {
    console.log('rooms#show', error)
  })
}

// メッセージルームを作成するapi
export const postRoom = (params) => {
  return axios.post(rooms, {
    room: { user_id: params.userId }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('room#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('room#create', error)
    })
}

// メッセージルームを削除するapi

// export const deletePost = (roomId) => {
//   return axios.delete(roomPath(roomId), { withCredentials: true })
//     .then(res => {
//       console.log('room#destroy', res)
//       alert('投稿を削除しました')
//       return res.data
//     })
//     .catch(error => {
//       console.log('room#destroy', error)
//     })
// }
