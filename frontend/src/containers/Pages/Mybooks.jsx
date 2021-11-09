import React, { useState, useEffect } from "react";
// styles
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// api
import { fetchUserBooks } from '../../apis/users'
// コンポーネント
import { BookCard } from '../../components/Books/BookCard'

export const Mybooks = (props) => {
  const [readBooks, setReadBooks] = useState(true)
  const [stackBooks, setStackBooks] = useState(true)
  const [value, setValue] = useState('read');
  // タブ機能
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ユーザーの本一覧を取得
  const fetchBooks = () => {
    fetchUserBooks(props.loginUser.id)
      .then(data => {
        setReadBooks(data.read_books)
        setStackBooks(data.stack_books)
      })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <h1>マイブック</h1>
      </Grid>

      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <h3>読んだ本（{readBooks.length}冊）</h3>
        <h3>積んでいる本（{stackBooks.length}冊）</h3>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="読んだ本(？冊)" value="read" />
              <Tab label="積んでいる本(？冊)" value="stack" />
            </TabList>
          </Box>
          <TabPanel value="read">
            <p>読んだ本{readBooks.length}</p>
            {/* <p>{readBooks[0].created_at}</p> */}
            {/* {
              readBooks && (
                readBooks.map(book =>
                  <Grid item key={book.id}
                    xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <BookCard
                      book={book}
                    />
                  </Grid>
                )
              )
            } */}
          </TabPanel>
          <TabPanel value="stack">
            <p>積んでいる本{stackBooks.length}</p>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid >
  )
}
