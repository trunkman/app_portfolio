import axios from "axios";
import { notifications } from "../urls";

// 通知を表示するapi
export const fetchNotifications = (params) => {
  return axios.get(notifications, { withCredentials: true })
    .then(res => {
      console.log('notifications#index', res);
      return res.data;
    })
    .catch(error => {
      console.log('notifications#index', error);
    });
}
