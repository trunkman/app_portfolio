import axios from "axios";
import { rooms, roomPath } from "../urls";

// トークルームのメッセージ一式を取得するapi
export const fetchMessages = (roomId) => {
  return axios.get(roomPath(roomId), { withCredentials: true })
    .then(res => {
      console.log('rooms#show', res);
      return res.data;
    })
    .catch(error => {
      console.log('rooms#show', error);
    });
}

// メッセージルームを作成するapi
export const postRoom = (params) => {
  return axios.post(rooms, {
    room: { user_id: params.userId }
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('rooms#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('rooms#create', error);
    });
}

// メッセージルームを削除するapi
export const deleteRoom = (roomId) => {
  return axios.delete(roomPath(roomId), { withCredentials: true })
    .then(res => {
      console.log('rooms#destroy', res)
      return res.data;
    })
    .catch(error => {
      console.log('rooms#destroy', error);
    });
}
