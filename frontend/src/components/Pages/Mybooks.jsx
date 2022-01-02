import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/system'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from "@mui/material/Typography";
// Api
import { fetchUserBooks } from '../../apis/users';
import { fetchSearchBooks } from '../../apis/books';
import { deleteRecommend } from '../../apis/recommends'
// Reducer
import { bookInitialState, bookReducer } from '../../reducer/BookReducer';
// Component
import { BookCard } from '../../components/Lists/BookCard';
import { BookList } from '../../components/Lists/BookList';
import { BookRecommend } from '../UserInfomation/BookRecommend';
import { BookSearch } from '../Items/BookSearch';
import { Loading } from '../Items/Loading';

const useStyles = makeStyles(() =>
  createStyles({
    'recommend': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 20,
      width: 550,
    },
    'list': {
      background: '#334b63',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: 1000,
    },
    'card': {
      background: '#334b63',
      display: 'flex',
      flexDirection: 'column',
      width: 250,
      height: 385,
      padding: 15,
    },
  }),
);

const Container = styled('box')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  maxWidth: 1000,
  mx: 'auto',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));


export const Mybooks = ({ userId }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('read');
  const [bookState, bookDispatch] = useReducer(bookReducer, bookInitialState);
  const tabLabelRead = `読了 : ${bookState.readBooks.length} 冊`
  const tabLabelStack = `積読 : ${bookState.stackBooks.length} 冊`
  // ユーザーの登録本を取得する
  const myBooks = () => {
    fetchUserBooks(userId)
      .then(data => {
        bookDispatch({
          type: 'fetchSuccess',
          payload: {
            user: data.user,
            recommendBook: data.recommend_book,
            readBooks: data.read_books,
            stackBooks: data.stack_books,
          }
        });
      });
  }
  // 検索したキーワードに該当本を取得する
  const searchBooks = () => {
    bookDispatch({ type: 'posting' });
    fetchSearchBooks({ keyword: keyword })
      .then(data => {
        data && bookDispatch({
          type: 'postSuccess',
          payload: data.books,
        });
        !data && alert('書籍名を入力してください。')
      });
  }
  // おすすめ本を解除する
  const NotRecommend = (bookId) => {
    deleteRecommend(bookId)
      .then(() => {
        bookDispatch({ type: 'reRender', });
      })
  }

  useEffect(() => {
    myBooks();
  }, [tab, bookState.reRender])

  return (
    <Container>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Title>≪ Sleep Bookshelf ≫</Title>
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <BookRecommend
            book={bookState.recommendBook}
            NotRecommend={NotRecommend}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BookSearch
            bookState={bookState}
            handleChange={e => setKeyword(e.target.value)}
            keyword={keyword}
            searchBooks={searchBooks}
          />
        </Grid>
        {bookState.fetchState !== 'ok' ? <Loading /> :

          <>
            {bookState.searchBooks.length !== 0 &&
              <Box className={classes.list}>
                {bookState.searchBooks.map(book =>
                  <Box
                    className={classes.card}
                    key={book.params.isbn.toString()}
                  >
                    <BookCard book={book.params} />
                  </Box>
                )}
              </Box>
            }

            {bookState.searchBooks.length === 0 &&
              <>
                <TabContext value={tab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={(event, newTab) => { setTab(newTab) }}
                      variant="fullWidth"
                    >
                      <Tab
                        label={tabLabelRead}
                        value="read"
                        sx={{ typography: 'h6', fontWeight: 'bold' }}
                      />
                      <Tab
                        label={tabLabelStack}
                        value="stack"
                        sx={{ typography: 'h6', fontWeight: 'bold' }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="read">
                    {bookState.readBooks.length === 0 ? (
                      <Box sx={{ width: 1000 }}>
                        <h2>読了した本はありません。</h2>
                        <h2>睡眠本を読んで快適な睡眠生活を送ってみませんか？</h2>
                      </Box>
                    ) : (
                      <Box className={classes.list}>
                        <BookList books={bookState.readBooks} />
                      </Box>

                    )}
                  </TabPanel>
                  <TabPanel value="stack">
                    {bookState.stackBooks.length === 0 ? (
                      <Box sx={{ width: 1000 }}>
                        <h2>積んでいる本はありません。</h2>
                        <h2>読んでみたい睡眠本を検索し、ポチりましょう。</h2>
                      </Box>
                    ) : (
                      <Box className={classes.list}>
                        <BookList books={bookState.stackBooks} />
                      </Box>
                    )}
                  </TabPanel>
                </TabContext>
              </>
            }
          </>
        }
      </Grid>
    </Container>
  )
}
