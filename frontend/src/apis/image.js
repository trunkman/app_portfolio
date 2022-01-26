import axios from "axios";
import { avatar, micropost } from "../urls";

// Avatar画像を登録するapi
export const postAvatarImage = (params) => {
  return axios.post(avatar, {
    image: { avatar_url: params.url }
  }, {
    withCredentials: true
  })
    .then(res => {
      // console.log('images#avatar', res);
      return res.data;
    })
    .catch(error => {
      console.log('images#avatar', error);
    })
}
