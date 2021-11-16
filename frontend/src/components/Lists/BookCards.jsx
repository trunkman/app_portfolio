import React from "react";
// styles
import Grid from "@mui/material/Grid";
// コンポーネント
import { BookList } from "./BookList";

export const BookCards = ({ books, dataFatching }) => {
  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      {books.length === 0 ? (
        <h2>読了登録した本はありません。</h2>
      ) : (
        books.map(book =>
          <Grid item key={book.id}
            xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
            <BookList
              book={book}
              dataFatching={dataFatching}
            />
          </Grid>
        )
      )
      }
    </Grid>
  )
}
