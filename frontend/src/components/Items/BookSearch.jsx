import React from "react";
// Style
import { styled } from '@mui/system'
// Component
import { BookSearchButton } from '../../components/Buttons/BookSearchButton';
import { SearchForm } from '../Forms/SearchForm';

const Wrapper = styled('box')(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20,
}));

export const BookSearch = ({
  handleChange,
  handleSubmit,
  keyword,
}) => {

  return (
    <Wrapper>
      <SearchForm
        handleChange={handleChange}
        keyword={keyword}
      />
      <BookSearchButton
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  )
}
