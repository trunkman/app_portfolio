import axios from "axios";
import { recommends, recommendPath } from "../urls";

// おすすめ本を登録するapi
export const postRecommend = (params) => {
  return axios.post(recommends, {
    recommend: {
      book_isbn: params.bookIsbn,
    }
  }, {
    withCredentials: true
  })
    .then(res => {
      // console.log('recommends#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('recommends#create', error);
    });
}

// おすすめ本を削除するapi
export const deleteRecommend = (bookId) => {
  return axios.delete(recommendPath(bookId), { withCredentials: true })
    .then(res => {
      // console.log('recommends#destroy', res);
      return res.data;
    })
    .catch(error => {
      console.log('recommends#destroy', error);
    });
}
