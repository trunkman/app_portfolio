import axios from "axios";
import { books, bookPath } from "../urls";

// 本検索ページを取得するapi index
export const fetchSearchPage = () => {
  return axios.get(books, {
    withCredentials: true
  }).then(res => {
    console.log('book#index', res);
  }).catch(error => {
    console.log('book#index', error)
  })
}

// 本検索結果を取得するapi fetchRakutenBooks
export const fetchBooks = () => {
  return axios.get(books, {
    // book: { title: params.book.id}
  }).then(res => {
    console.log('book#index', res)
    return res.data
  }).catch(error => {
    console.log('book#index', error)
  })
}

// 本情報を保管するapi create
export const postbook = (params) => {
  return axios.post(books, {
    // book: { title: params.userId }
  }, {
    withCredentials: true
  }).then(res => {
    console.log('book#create', res);
    return res.data;
  }).catch(error => {
    console.log('book#create', error)
  })
}

// 本詳細情報を表示するapi
export const fetchBook = (params) => {
  return axios({
    method: 'get',
    baseURL: bookPath(params.bookId),
    data: { book: { id: params.bookId } },
    withCredentials: true,
  }).then(res => {
    console.log('book#show', res);
  }).catch(error => {
    console.log('book#show', error)
  })
}
