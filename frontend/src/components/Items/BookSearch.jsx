import React, { useState } from "react";
// Style
import { styled } from '@mui/system'
// Component
import { BookSearchButton } from '../../components/Buttons/BookSearchButton';
import { Search } from '../Forms/Search';

const Wrapper = styled('box')(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20,
}));

export const BookSearch = ({
  handleChange,
  keyword,
  searchBooks,
}) => {

  return (
    <Wrapper>
      <Search
        handleChange={handleChange}
        keyword={keyword}
      />
      <BookSearchButton
        handleSubmit={() => searchBooks()}
      />
    </Wrapper>
  )
}
