import React from "react";
// Style
import { styled } from '@mui/system'

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: 50,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  margin: '15px 0px',
}));

export const BookSearchButton = ({ handleSubmit }) => {

  return (
    <ContainedButton
      type='submit'
      onClick={handleSubmit}
    >
      本を検索する
    </ContainedButton>
  )
}
