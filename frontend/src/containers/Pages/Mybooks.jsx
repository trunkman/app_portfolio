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

export const Mybooks = ({
  match,
  loginUser,
}) => {
  const userId = match.params.id
  const tabLabelRead = `読了 : ${bookState.readBooks.length} 冊`
  const tabLabelStack = `積読 : ${bookState.stackBooks.length} 冊`
  const [keyword, setKeyword] = useState('-');
  const [tab, setTab] = useState('read');
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);
  const [bookState, bookDispatch] = useReducer(bookReducer, bookInitialState);

  // ユーザーの登録本を取得する
  const fetchBooks = () => {
    fetchUserBooks(userId)
      .then(data => {
        bookDispatch({
          type: 'fetchSuccess',
          payload: {
            readBooks: data.read_books,
            stackBooks: data.stack_books,
          }
        });
      });
  }

  // 検索したキーワードに該当本を取得する
  const fetchSearchBooks = () => {
    fetchBooks({ keyword: keyword })
      .then(data => {
        bookDispatch({
          type: 'postSuccess',
          payload: data.books,
        });
      });
  }

  useEffect(() => {
    fetchBooks();
    return () => setKeyword('');
  }, [tab])

  return (
    <>
      <h2>TestNameさんの本棚</h2>
      <Grid comtainer>
        <Grid item xs={12} sm={7}>
          <h3>TestNameさんの本棚</h3>
          <Search
            keyword={keyword}
            handleChange={e => setKeyword(e.target.value)}
          />
          <BookSearchButton
            handleSubmit={fetchSearchBooks}
          />
          <h4>検索ワード : {keyword} </h4>
          <h4>検索結果 : {books.length} 件</h4>
        </Grid>

        <Grid item xs={12} sm={5}>
          おすすめ本
        </Grid>

        <Grid item xs={12}>
          <Box>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  aria-label="lab API tabs example"
                  onChange={(event, newTab) => setTab(newTab)}
                >
                  <Tab label={tabLabelRead} value="read" />
                  <Tab label={tabLabelStack} value="stack" />
                </TabList>
              </Box>
              <TabPanel value="read">
                {readBooks.length === 0 ? (
                  <h2>読了した本はありません。</h2>
                ) : (
                  <BookList books={readBooks} />
                )}
              </TabPanel>
              <TabPanel value="stack">
                {readBooks.length === 0 ? (
                  <h2>積んでいる本はありません。</h2>
                ) : (
                  <BookList books={stackBooks} />
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
