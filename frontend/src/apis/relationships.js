import axios from "axios";
import { relationships, relationshipPath } from "../urls";

export const postFollow = (params) => {
  return axios.post(relationships, {
    followed_id: params.userId
  }, {
    withCredentials: true
  })
    .then(res => {
      // console.log('relationships#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('relationships#create', error);
    });
}

export const deleteUnfollow = (userId) => {
  return axios.delete(relationshipPath(userId), { withCredentials: true })
    .then(res => {
      // console.log('relationships#destroy', res);
      return res.data;
    })
    .catch(error => {
      console.log('relationships#destroy', error);
    });
}
