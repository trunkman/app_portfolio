import React, { useState, useEffect, useReducer } from "react";
// Style
import { styled } from '@mui/system'
import Typography from "@mui/material/Typography";
// Api
import { fetchUserBooks } from '../../apis/users';
import { fetchSearchBooks } from '../../apis/books';
// import { deleteRecommend } from '../../apis/recommends'
// Reducer
import { bookInitialState, bookReducer } from '../../reducer/BookReducer';
// Component
import { MyBookList } from '../Lists/MyBookList';
import { BookSearch } from '../Items/BookSearch';
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
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));

export const Mybooks = ({ userId }) => {
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
        !bookState.searchBooks.length && alert('書籍名が一致する本がありませんでした。')
      });
  }

  useEffect(() => {
    myBooks();
  }, [tab, bookState.reRender])

  return (
    <Container>
      {bookState.fetchState !== 'ok' ? <Loading /> :
        <>
          <Typography variant="h2" sx={{ width: '100%' }}>
            <Title>≪ {bookState.user.name}の睡眠本棚 ≫</Title>
          </Typography>
          <BookSearch
            handleChange={e => setKeyword(e.target.value)}
            keyword={keyword}
            searchBooks={searchBooks}
          />
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

// おすすめ本を解除する
// const NotRecommend = (bookId) => {
//   deleteRecommend(bookId)
//     .then(() => {
//       bookDispatch({ type: 'reRender', });
//     })
// }

{/* <Grid item xs={12} sm={6}>
          <BookRecommend
            book={bookState.recommendBook}
            NotRecommend={NotRecommend}
          />
        </Grid> */}
