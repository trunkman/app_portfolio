import axios from "axios";
import { micropostCreate, micropostDestroy } from "../urls";

export const postMicropost = (params) => {
  return axios.post(micropostCreate, {
    micropost: {
      content: params.content,
      user_id: params.user_id,
    }
  },
    { withCredentials: true }
  )
    .then(res => {
      if (res.data) {
        console.log('micropost#create', res);
        return res.data;
      }
    })
    .catch(e => {
      console.error(e);
      return 'nil'
    })
}

export const deleteMicropost = () => {
  return axios.delete(micropostDestroy, { withCredentials: true })
    .then(res => {
      console.log('micropost#destroy', res)
      return res.data
    })
    .catch.error(e => {
      console.error(e)
    })
}
