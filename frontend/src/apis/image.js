import axios from "axios";
import { presignedObject, avatar, micropost } from "../urls";

// 署名URLを取得するするapi
export const fetchPresigned = (fileName) => {
  return axios.get(presignedObject(fileName), { withCredentials: true })
    .then(res => {
      console.log('images#presigned_object', res);
      return res.data;
    })
    .catch(error => {
      console.log('images#presigned_object', error);
    });
}

// S3にアップロードするapi
export const putS3 = (params) => {
  console.log(params)
  // return axios.post(params.presignedObjectUrl,
  //   params.formData,
  //   { headers: { 'accept': 'multipart/form-data' } }
  // )
  return fetch(params.presignedObjectUrl, {
    method: 'PUT',
    headers: {
      "accept": "multipart/form-data",
      'Content-Type': params.fileType
    },
    body: params.formData,
  })
    .then(res => {
      console.log('S3', res);
      return res.data;
    })
    .catch(error => {
      console.log('S3', error);
    })
}

// Avatar画像を登録するapi
export const postAvatarImage = (params) => {
  return axios.post(avatar, {
    avatarUrl: params.avatarUrl
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('images#avatar', res);
      return res.data;
    })
    .catch(error => {
      console.log('images#avatar', error);
    })
}

// 投稿画像を登録するapi
export const postMicropostImage = (params) => {
  return axios.post(micropost, {
    micropostUrl: params.micropostUrl
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('images#micropost', res);
      return res.data;
    })
    .catch(error => {
      console.log('images#micropost', error);
    })
}

