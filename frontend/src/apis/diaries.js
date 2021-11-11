import axios from "axios";
import { diaries, diaryPath } from "../urls";


// 日記を登録するapi
export const postDiary = (params) => {
  return axios.post(diaries, {
    diary: {
      date: params.date,
      sleeping_hours: params.sleepingHours,
      feeling: params.feeling,
    }
  }, {
    withCredentials: true
  }).then(res => {
    console.log('diary#create', res);
    return res.data;
  }).catch(error => {
    console.log('diary#create', error)
  })
}

// 日記情報を更新するapi
export const patchDiary = (params) => {
  return axios.patch(diaryPath(params.diaryId), {
    diary: {
      date: params.date,
      sleeping_hours: params.sleepingHours,
      feeling: params.feeling,
    }
  }, {
    withCredentials: true
  }).then(res => {
    if (res.data) {
      console.log('diary#update', res);
      return res.data;
    }
  }).catch(error => {
    console.log('diary#create', error)
  })
}

// 本詳細情報を表示するapi
// export const fetchdiary = (params) => {
//   return axios({
//     method: 'get',
//     baseURL: diaryPath(params.diaryId),
//     data: { diary: { id: params.diaryId } },
//     withCredentials: true,
//   }).then(res => {
//     console.log('diary#show', res);
//   }).catch(error => {
//     console.log('diary#show', error)
//   })
// }
