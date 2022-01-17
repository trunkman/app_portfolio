import React, { useState, useEffect, useReducer } from "react";
// Style
import { styled } from '@mui/system'
import Typography from "@mui/material/Typography";
// Api
import { deleteRecommend } from '../../apis/recommends'
import { fetchUserBooks } from '../../apis/users';
import { fetchSearchBooks } from '../../apis/books';
// Reducer
import { bookInitialState, bookReducer } from '../../reducer/BookReducer';
// Component
import { BookMyList } from '../Lists/BookMyList';
import { BookSearch } from '../Items/BookSearch';
import { BookSearchList } from "../Lists/BookSearchList";
import { BookRecommend } from '../UserInfomations/BookRecommend';
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1000,
  mx: 'auto',
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const TitleTag = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 3,
}));

const BookWrapper = styled('box')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
}));

export const Bookshelf = ({ userId }) => {
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('read');
  const [bookState, bookDispatch] = useReducer(bookReducer, bookInitialState);
  const [hasMore, setHasMore] = useState(true);
  const [searchList, setSearchList] = useState(bookState.searchBooks);

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
  const searchBooks = (page) => {
    bookDispatch({ type: 'posting' });
    fetchSearchBooks({
      keyword: keyword,
      page: page,
    })
      .then(data => {
        data && bookDispatch({
          type: 'postSuccess',
          payload: data.books,
        });
        !data && alert('書籍名を入力してください。')
      });
  }

  // データを追加で読み込む関数
  const loadMore = async (page) => {
    searchBooks(page);
    await bookState.searchBooks.length < 1
      ? // 処理終了
      setHasMore(false)
      :  // 取得データをリストを追加
      setSearchList([...searchList, ...bookState.searchBooks])
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
      {bookState.fetchState !== 'ok' && <Loading />}

      {bookState.fetchState === 'ok' &&
        <>
          <Typography variant="h3">
            <Title>≪ 睡眠本棚 ≫<br /></Title>
            <TitleTag>~ {bookState.user.name} ~</TitleTag>
          </Typography>
          <BookWrapper>
            <BookRecommend
              book={bookState.recommendBook}
              notRecommend={notRecommend}
            />
            <BookSearch
              handleChange={e => setKeyword(e.target.value)}
              handleSubmit={() => searchBooks(1)}
              keyword={keyword}
            />
          </BookWrapper>

          {bookState.searchBooks.length !== 0 &&
            <BookSearchList
              // bookDispatch={bookDispatch}
              hasMore={hasMore}
              searchList={searchList}
              loadMore={loadMore}
            />
          }

          {bookState.searchBooks.length === 0 &&
            <BookMyList
              bookState={bookState}
              setTab={setTab}
              tab={tab}
            />
          }
        </>
      }
    </Container>
  )
}

