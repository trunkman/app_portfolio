import axios from "axios";
import { notifications, notificationsDelete } from "../urls";

// 通知を表示するapi
export const fetchNotifications = () => {
  return axios.get(notifications, { withCredentials: true })
    .then(res => {
      console.log('notifications#index', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#index', error);
    });
}

export const deleteNotifications = () => {
  return axios.delete(notificationsDelete, { withCredentials: true })
    .then(res => {
      console.log('notifications#all_delete', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#all_delete', error);
    });
}
