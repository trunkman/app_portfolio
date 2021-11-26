import React, { useEffect, useState } from "react";
//Style
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
// Api
import { fetchBook } from "../../apis/books";
// Component
import { ReadButton } from "../../components/Buttons/ReadButton";

export const Book = ({ bookIsbn }) => {
  const [book, setBook] = useState([])
  const [registration, setResistration] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  // ISBNで特定した本情報を取得する
  useEffect(() => {
    fetchBook(bookIsbn)
      .then(data => {
        setBook(data.book[0].params)
        setResistration(data.registration)
        setSubscribed(data.subscribed)
      })
  }, [])

  return (
    <>
      <h1>{book.title}</h1>
      <Divider />
      <Grid container sx={{ maxWidth: 800 }}>
        <Grid item xs={12} sm={4}>
          <img
            alt={book.title}
            src={`${book.largeImageUrl}`}
            sx={{ height: 100, width: 70 }}
          />
          <ReadButton
            book={book}
            registration={registration}
            subscribed={subscribed}
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ px: 2 }}>
          <p>著者名   {book.author}</p>
          <p>出版社名 {book.publisherName}</p>
          <p>出版日   {book.salesDate}</p>
          <p>定価     {book.itemPrice}円</p>
          <p>URL      {book.itemUrl}</p>
          <p>楽天レビュー平均   星：{book.reviewAverage}</p>
          <p>楽天レビュー件数   {book.reviewCount}件</p>
          <Button>
            私のおすすめに登録する
          </Button>
        </Grid>
      </Grid>

      {/* <Grid item sm={12} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <p>投稿内容を表示する</p>
      </Grid> */}
    </>
  )
}
