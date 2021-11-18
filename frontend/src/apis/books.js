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

// 検索した本一覧を取得するapi
export const fetchBooks = (params) => {
  return axios.post(booksearch, {
    book: { title: params.keyword }
  }, {
    withCredentials: true
  }).then(res => {
    console.log('book#search', res)
    return res.data;
  }).catch(error => {
    console.log('book#search', error)
  });
}

// 本を取得するapi (ISBNで特定する)
export const fetchBook = (bookIsbn) => {
  return axios.get(bookPath(bookIsbn), {
    withCredentials: true
  }).then(res => {
    console.log('book#show', res)
    return res.data;
  }).catch(error => {
    console.log('book#show', error)
  });
}

// 本をDBに登録するapi
export const postBook = (params) => {
  return axios.post(books, {
    read: params.read,
    registration: params.registration,
    book: {
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
    console.log('book#create', error);
  });
}

// 読了・積読情報を更新するapi
export const updateBook = (params) => {
  return axios.patch(bookPath(params.book.isbn), {
    read: params.read,
  }, {
    withCredentials: true
  }).then(res => {
    console.log('book#update', res);
    return res.data;
  }).catch(error => {
    console.log('book#update', error);
  });
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
