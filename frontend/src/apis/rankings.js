import axios from "axios";
import { sleepingHours, reading, readBooks, stackBooks } from "../urls";

// 睡眠時間平均上位6名を取得するapi
export const fetchSleepHoursRank = () => {
  return axios.get(sleepingHours, { withCredentials: true })
    .then(res => {
      // console.log('rankings#sleeping_hours', res);
      return res.data;
    })
    .catch(error => {
      console.log('rankings#sleeping_hours', error);
    });
}

// 読了数上位6名を取得するapi
export const fetchReadingRank = () => {
  return axios.get(reading, { withCredentials: true })
    .then(res => {
      // console.log('rankings#reading', res);
      return res.data;
    })
    .catch(error => {
      console.log('rankings#reading', error);
    });
}

// 読了本の人気6冊を取得するapi
export const fetchReadBooksRank = () => {
  return axios.get(readBooks, { withCredentials: true })
    .then(res => {
      // console.log('rankings#read_books', res);
      return res.data;
    })
    .catch(error => {
      console.log('rankings#read_books', error);
    });
}

// 積読本の人気6冊を取得するapi
export const fetchStackBooksRank = () => {
  return axios.get(stackBooks, { withCredentials: true })
    .then(res => {
      // console.log('rankings#stack_books', res);
      return res.data;
    })
    .catch(error => {
      console.log('rankings#stack_books', error);
    });
}
