import React, { useState, useEffect, useReducer } from "react";
// styles
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// api
import { fetchUserBooks } from '../../apis/users'
// reducer
import { dataInitialState, dataReducer } from '../../reducer/DataFetchReducer';
// コンポーネント
import { BookCards } from '../../components/Lists/BookCards'

export const Mybooks = ({ match, loginUser }) => {
  const [readBooks, setReadBooks] = useState([])
  const [stackBooks, setStackBooks] = useState([])
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState)
  const dataFatching = () => dataDispatch({ type: 'books' })

  const [value, setValue] = useState('read');
  // タブ機能
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  }, [dataState.books])

  return (
    <Box sx={{
      width: '100%',
      my: 2,
      border: 0.1,
    }}>
      <h1>Sleep Book List</h1>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="読んだ本" value="read" />
              <Tab label="積んでいる本" value="stack" />
            </TabList>
          </Box>
          <TabPanel value="read">
            <p>読了本：{readBooks.length}</p>
            <BookCards
              books={readBooks}
              dataFatching={dataFatching}
            />
          </TabPanel>
          <TabPanel value="stack">
            <p>積読本：{stackBooks.length}</p>
            <BookCards
              books={stackBooks}
              dataFatching={dataFatching}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
