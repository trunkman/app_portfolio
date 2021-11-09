import axios from "axios";
import { books, booksearch, bookPath } from "../urls";

// 本検索ページを取得するapi index
// export const fetchSearchPage = () => {
//   return axios.get(books, {
//     withCredentials: true
//   }).then(res => {
//     console.log('book#index', res);
//   }).catch(error => {
//     console.log('book#index', error)
//   })
// }

// 本検索結果を取得するapi
export const fetchBooks = (params) => {
  return axios.post(booksearch, {
    book: { title: params.keyword }
  }).then(res => {
    console.log('book#search', res)
    return res.data
  }).catch(error => {
    console.log('book#search', error)
  })
}

// ISBNで特定した本を取得するapi
export const fetchBook = (bookIsbn) => {
  return axios.get(bookPath(bookIsbn)
  ).then(res => {
    console.log('book#show', res)
    return res.data
  }).catch(error => {
    console.log('book#show', error)
  })
}

// 本情報をDBに登録するapi create
export const postbook = (params) => {
  return axios.post(books, {
    book: {
      read: params.read,
      title: params.book.title,
      auther: params.book.author,
      publisherName: params.book.publisherName,
      salesDate: params.book.salesDate,
      itemPrice: params.book.itemPrice,
      itemUrl: params.book.itemUrl,
      itemCaption: params.book.itemCaption,
      largeImageUrl: params.book.largeImageUrl,
      isbn: params.book.isbn,
      reviewCount: params.book.reviewCount,
      reviewAverage: params.book.reviewAverage,
    }
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
// export const fetchBook = (params) => {
//   return axios({
//     method: 'get',
//     baseURL: bookPath(params.bookId),
//     data: { book: { id: params.bookId } },
//     withCredentials: true,
//   }).then(res => {
//     console.log('book#show', res);
//   }).catch(error => {
//     console.log('book#show', error)
//   })
// }
