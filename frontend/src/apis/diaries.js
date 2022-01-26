import axios from "axios";
import { diaries, diaryPath, sleepDebt } from "../urls";

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
  })
    .then(res => {
      // console.log('diaries#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('diaries#create', error);
      alert('登録内容に誤りがございます');
    });
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
  })
    .then(res => {
      // console.log('diaries#update', res);
      return res.data;
    })
    .catch(error => {
      console.log('diaries#update', error)
    })
}

// 日記を削除するapi
export const deleteDiary = (diaryId) => {
  return axios.delete(diaryPath(diaryId), { withCredentials: true })
    .then(res => {
      // console.log('diaries#delete', res);
      return res.data;
    })
    .catch(error => {
      console.log('diaries#delete', error);
    });
}

// SleepDebtを取得するapi
export const fetchSleepDebt = (userId) => {
  return axios.get(sleepDebt(userId), { withCredentials: true })
    .then(res => {
      // console.log('diaries#sleep_debt', res)
      return res.data
    })
    .catch(error => {
      console.log('diaries#sleep_debt', error)
    })
}
