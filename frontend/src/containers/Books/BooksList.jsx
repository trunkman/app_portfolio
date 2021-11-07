import React, { useEffect, useState } from "react";
// styles
import Grid from "@mui/material/Grid";
// api
import { fetchBooks } from "../../apis/books";
// コンポーネント
import { BookCard } from '../../components/Books/BookCard'
import { BookSearch } from "../../components/Forms/BookSearch";
import { BookSearchButton } from "../../components/Buttons/BookSearchButton"

export const BooksList = () => {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const handleSubmit = () => {
    fetchBooks({
      keyword: keyword,
    }).then(data => {
      setKeyword('')
      setResults(data.books)
    })
  }

  useEffect(() => {
    return () => setResults([])
  }, [])

  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <p>書籍名で検索</p>
        <BookSearch
          keyword={keyword}
          handleChange={e => setKeyword(e.target.value)}
        />
        <BookSearchButton
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <h3>検索結果</h3>
        <h4>書籍 : {results.length} 件</h4>
      </Grid>
      {
        results && (
          results.map(result =>
            <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
              <BookCard
                book={result.params}
              />
            </Grid>
          )
        )
      }
    </Grid>
  )
}
