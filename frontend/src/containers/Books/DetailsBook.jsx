import React, { useEffect, useState } from "react";
//styles
import Grid from "@mui/material/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
import Button from "@material-ui/core/Button";
// api
import { fetchBook } from "../../apis/books";

export const DetailsBook = (props) => {
  const bookIsbn = props.match.params.isbn
  const [book, setBook] = useState([])
  // ISBNで特定した本情報を取得
  useEffect(() => {
    fetchBook(bookIsbn)
      .then(data => {
        setBook(data.book[0].params)
      })
    return () => setBook(null)
  }, [])

  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <h1>{book.title}</h1>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <img
          alt={book.title}
          src={`${book.largeImageUrl}`}
          sx={{ height: 100, width: 70 }}
        />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <p>著者名   {book.author}</p>
        <p>出版社名 {book.publisherName}</p>
        <p>出版日   {book.salesDate}</p>
        <p>定価     {book.itemPrice}円</p>
        <p>URL      {book.itemUrl}</p>
        <p>楽天レビュー平均   星：{book.reviewAverage}</p>
        <p>楽天レビュー件数   {book.reviewCount}件</p>
        <Button>
          この本を積む
        </Button>
        <Button>
          読了
        </Button>
      </Grid>
      <Grid item sm={12} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <p>投稿内容を表示する</p>
      </Grid>
    </Grid>
  )
}
