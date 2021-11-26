import axios from "axios";
import { microposts, micropostPath } from "../urls";

// 投稿を取得するapi
export const fetchMicropost = (micropostId) => {
  return axios.get(micropostPath(micropostId), { withCredentials: true })
    .then(res => {
      console.log('micropost#show', res);
      return res.data;
    }).
    catch(error => {
      console.log('micropost#show', error);
    });
}

// 投稿を作成するapi
export const postMicropost = (params) => {
  return axios.post(microposts, {
    micropost: {
      content: params.content,
      user_id: params.user_id,
    }
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('micropost#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('micropost#create', error);
    });
}

// 投稿を削除するapi
export const deleteMicropost = (micropostId) => {
  return axios.delete(micropostPath(micropostId), { withCredentials: true })
    .then(res => {
      console.log('micropost#destroy', res);
      return res.data;
    }).
    catch(error => {
      console.log('micropost#destroy', error);
    });
}
