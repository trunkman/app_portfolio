import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
// Api
import { postBook, updateBook } from "../../apis/books";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  marginRight: '30px',
}));

export const ReadButton = ({
  book,
  registration,
  subscribed,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);

  // 本を登録する(booleanがtrue：読了、false:積読)
  const handleClick = boolean => {
    // ユーザー未登録本の場合、CreateでDBに登録する
    !subscribed && (
      postBook({
        read: boolean,
        registration: registration,
        book: book,
      })
        .then(data => {
          data.subscription.read
            ? history.push(`/users/${authState.loginUser.id}/read_books`)
            : history.push(`/users/${authState.loginUser.id}/stack_books`)
        })
    );
    // ユーザー登録済み本の場合、UpdateでDBを更新する
    subscribed && (
      updateBook({
        read: boolean,
        book: book,
      })
        .then(data => {
          data.subscription.read
            ? history.push(`/users/${authState.loginUser.id}/read_books`)
            : history.push(`/users/${authState.loginUser.id}/stack_books`)
        })
    );
  }

  return (
    <Box>
      <ContainedButton
        onClick={() => handleClick("false")}
        variant="outlined"
      >
        積んでおく
      </ContainedButton>
      <ContainedButton
        onClick={() => handleClick("true")}
      >
        読了
      </ContainedButton>
    </Box>
  )
}
