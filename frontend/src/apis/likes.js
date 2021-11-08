import axios from "axios";
import { like, unlike } from "../urls";

// いいねするapi
export const postLike = (params) => {
  return axios.post(like, {
    like: {
      "user_id": params.userId,
      "micropost_id": params.micropostId
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('like#create', res);
        return res.data;
      }
    })
    .catch(error => {
      console.log('like#create', error)
    })
}

// いいねを解除するapi
export const postUnlike = (params) => {
  return axios.post(unlike, {
    like: {
      user_id: params.userId,
      micropost_id: params.micropostId
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      console.log('like#destroy', res)
      return res.data
    })
    .catch(error => {
      console.log('like#destroy', error)
    })
}


