import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Typography from "@mui/material/Typography";
// Api
import { deleteRecommend } from '../../apis/recommends'
import { fetchUserBooks } from '../../apis/users';
import { fetchSearchBooks } from '../../apis/books';
// Reducer
import { bookInitialState, bookReducer } from '../../reducer/BookReducer';
// Component
import { MyBookList } from '../Lists/MyBookList';
import { BookSearch } from '../Items/BookSearch';
import { BookRecommend } from '../UserInfomations/BookRecommend';
import { Loading } from '../Items/Loading';
import { SearchBookList } from "../Lists/SearchBookList";

const Container = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1000,
  mx: 'auto',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
  paddingBottom: 2,
}));

export const Bookshelf = ({ userId }) => {
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('read');
  const [bookState, bookDispatch] = useReducer(bookReducer, bookInitialState);

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
  const notRecommend = () => {
    deleteRecommend(bookState.recommendBook.id)
      .then(() => {
        bookDispatch({ type: 'reRender', });
      })
  }

  useEffect(() => {
    myBooks();
  }, [tab, bookState.reRender, userId])

  return (
    <Container>
      {bookState.fetchState !== 'ok' ? <Loading /> :
        <>
          <Typography variant="h3">
            <Title>≪ {bookState.user.name}の睡眠本棚 ≫</Title>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', lexWrap: 'wrap' }}>
            <BookSearch
              handleChange={e => setKeyword(e.target.value)}
              keyword={keyword}
              searchBooks={searchBooks}
            />
            <BookRecommend
              book={bookState.recommendBook}
              notRecommend={notRecommend}
            />
          </Box>
          {bookState.searchBooks.length !== 0 &&
            <SearchBookList bookState={bookState} />
          }
          {bookState.searchBooks.length === 0 &&
            <MyBookList
              bookState={bookState}
              setTab={setTab}
              tab={tab} ß
            />
          }
        </>
      }
    </Container>
  )
}

