import axios from "axios";
import { books, booksearch, bookPath } from "../urls";

// 本を取得するapi (ISBNで特定する)
export const fetchBook = (bookIsbn) => {
  return axios.get(bookPath(bookIsbn), { withCredentials: true })
    .then(res => {
      console.log('books#show', res);
      return res.data;
    }).catch(error => {
      console.log('books#show', error);
    });
}

// 本を(ユーザーとDBに)登録するapi
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
  })
    .then(res => {
      console.log('books#create', res);
      return res.data;
    })
    .catch(error => {
      console.log('books#create', error);
    });
}

// 読了・積読情報を更新するapi
export const updateBook = (params) => {
  return axios.patch(bookPath(params.book.isbn), {
    read: params.read,
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('books#update', res);
      return res.data;
    })
    .catch(error => {
      console.log('books#update', error);
    });
}

// 検索したワードの本を取得するapi
export const fetchBooks = (params) => {
  return axios.post(booksearch, {
    book: { title: params.keyword }
  }, {
    withCredentials: true
  })
    .then(res => {
      console.log('books#search', res);
      return res.data;
    })
    .catch(error => {
      console.log('books#search', error);
    });
}
