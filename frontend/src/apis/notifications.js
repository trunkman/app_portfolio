import axios from "axios";
import { notifications, notificationsDelete, notificationsCheck } from "../urls";

// 通知を表示するapi
export const fetchNotifications = () => {
  return axios.get(notifications, { withCredentials: true })
    .then(res => {
      // console.log('notifications#index', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#index', error);
    });
}

// 通知を削除するapi
export const deleteNotifications = () => {
  return axios.delete(notificationsDelete, { withCredentials: true })
    .then(res => {
      // console.log('notifications#all_delete', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#all_delete', error);
    });
}

// 新規通知が存在するかチェックするapi
export const checkNotifications = () => {
  return axios.get(notificationsCheck, { withCredentials: true })
    .then(res => {
      // console.log('notifications#check', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#check', error);
    });
}
