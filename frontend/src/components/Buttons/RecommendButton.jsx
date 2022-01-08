import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
// Api
import { postRecommend } from "../../apis/recommends";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
  height: 30,
  margin: '30px 0px',
  padding: '0px 20px',
}));

export const RecommendButton = ({
  bookIsbn,
  registration,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);

  // 私のおすすめ睡眠本に登録する
  const submitRecommend = () => {
    postRecommend({ bookIsbn: bookIsbn })
      .then(data => {
        alert(data.message)
        history.push(`/users/${authState.loginUser.id}/books`)
      })
  }

  return (
    <Box>
      {registration &&
        <ContainedButton onClick={submitRecommend}>
          私のおすすめにする
        </ContainedButton>
      }
    </Box>
  )
}
