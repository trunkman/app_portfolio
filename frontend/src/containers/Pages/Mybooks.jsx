import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Api
import { fetchUserBooks } from '../../apis/users'
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
// Component
import { BookList } from '../../components/Lists/BookList'

export const Mybooks = ({ match, loginUser }) => {
  const [readBooks, setReadBooks] = useState([])
  const [stackBooks, setStackBooks] = useState([])
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState)
  const [tab, setTab] = useState('read');

  // ユーザーの本一覧を取得
  const fetchBooks = () => {
    fetchUserBooks(match.params.id)
      .then(data => {
        setReadBooks(data.read_books)
        setStackBooks(data.stack_books)
      }).catch(e => { console.log(e) })
  }

  useEffect(() => {
    fetchBooks()
    dataDispatch({ type: 'complete' })
    return () => {
      setReadBooks([])
      setStackBooks([])
    }
  }, [tab])

  return (
    <Box sx={{
      width: '100%',
      my: 2,
      border: 0.1,
    }}>
      <h1>Sleep Book List</h1>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              aria-label="lab API tabs example"
              onChange={(event, newTab) => setTab(newTab)}
            >
              <Tab label="読んだ本" value="read" />
              <Tab label="積んでいる本" value="stack" />
            </TabList>
          </Box>

          <TabPanel value="read">
            <p>読了本：{readBooks.length}</p>
            {readBooks.length === 0 ? (
              <h2>読了した本はありません。</h2>
            ) : (
              <BookList
                books={readBooks}
              />
            )}
          </TabPanel>

          <TabPanel value="stack">
            <p>積読本：{stackBooks.length}</p>
            {readBooks.length === 0 ? (
              <h2>積んでいる本はありません。</h2>
            ) : (
              <BookList
                books={stackBooks}
              />
            )}
          </TabPanel>

        </TabContext>
      </Box>
    </Box>
  )
}
