import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Api
import { fetchUserBooks } from '../../apis/users';
import { fetchSearchBooks } from '../../apis/books';
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
import { bookInitialState, bookReducer } from '../../reducer/BookReducer';
// Component
import { BookList } from '../../components/Lists/BookList';
import { Search } from '../../components/Forms/Search';
import { BookSearchButton } from '../../components/Buttons/BookSearchButton';
import { BookCard } from '../../components/Lists/BookCard';

export const Mybooks = ({
  match,
  loginUser,
}) => {
  const userId = match.params.id
  const tabLabelRead = `読了 : ${[].length} 冊`
  const tabLabelStack = `積読 : ${[].length} 冊`
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('read');
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);
  const [bookState, bookDispatch] = useReducer(bookReducer, bookInitialState);

  // ユーザーの登録本を取得する
  const myBooks = () => {
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
  const searchBooks = () => {
    bookDispatch({ type: 'posting', })
    fetchSearchBooks({ keyword: keyword })
      .then(data => {
        bookDispatch({
          type: 'postSuccess',
          payload: data.books,
        });
      });
  }

  useEffect(() => {
    myBooks();
    return () => setKeyword('');
  }, [tab, bookState.reRender])

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
            handleSubmit={searchBooks}
          />
          <h4>検索ワード : {keyword} </h4>
          <h4>検索結果 : {bookState.searchBooks.length} 件</h4>
        </Grid>

        <Grid item xs={12} sm={5}>
          <p>
            おすすめ本
          </p>
        </Grid>

        {bookState.fetchState != 'ok' ? <Loading /> :

          <Grid item xs={12}>
            {bookState.searchBooks.length != 0 &&
              <Grid container sx={{ mx: "auto" }}>
                {bookState.searchBooks.map(book =>
                  <Grid item key={book.params.isbn.toString()}
                    xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <BookCard book={book.params} />
                  </Grid>
                )}
              </Grid>
            }

            {bookState.searchBooks.length == 0 &&
              <Box>
                <TabContext value={tab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={(event, newTab) => setTab(newTab)}
                    >
                      <Tab label={tabLabelRead} value="read" />
                      <Tab label={tabLabelStack} value="stack" />
                    </TabList>
                  </Box>
                  <TabPanel value="read">

                    {bookState.readBooks.length === 0 ? (
                      <h2>読了した本はありません。</h2>
                    ) : (
                      <BookList books={bookState.readBooks} />
                    )}
                  </TabPanel>
                  <TabPanel value="stack">
                    {bookState.stackBooks.length === 0 ? (
                      <h2>積んでいる本はありません。</h2>
                    ) : (
                      <BookList books={bookState.stackBooks} />
                    )}
                  </TabPanel>
                </TabContext>
              </Box>
            }
          </Grid>
        }
      </Grid>
    </>
  )
}
