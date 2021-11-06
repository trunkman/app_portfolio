import React, { useEffect } from "react";
// styles
import Grid from "@mui/material/Grid";
// コンポーネント
import { BookCard } from '../../components/Books/BookCard'
import { BookSearch } from "../../components/Forms/BookSearch";
import { BookSearchButton } from "../../components/Buttons/BookSearchButton"

export const BooksList = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(false)
  const handleSubmit = () => {
    postBookSearch({
      // 送るparams: search,
    }).then(data => {
      setSearch('')
      setResult(true)
    })
  }

  useEffect(() => {
    return () => setResult(false)
  }, [])

  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <p>書籍名で検索</p>
        <BookSerch
          search={search}
          handleChange={e => setSearch(e.target.value)}
        />
        <BookSearchButton
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <h3>検索結果</h3>
        <h4>書籍（？？件）</h4>
      </Grid>

      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>
      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>
      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>
      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>
      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>
      <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <BookCard />
      </Grid>

    </Grid>
  )
}
