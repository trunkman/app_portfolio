import React, { useState } from "react";
// Style
import { styled } from '@mui/system'
import Typography from "@mui/material/Typography";
// Component
import { BookSearchButton } from '../../components/Buttons/BookSearchButton';
import { Search } from '../Forms/Search';

const Wrapper = styled('box')(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  margin: 20,
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
