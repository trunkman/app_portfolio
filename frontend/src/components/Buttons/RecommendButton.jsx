import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
// Api
import { postRecommend } from "../../apis/recommends";

const OutinedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  margin: '30px 0px',
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
        history.push(`/users/${authState.loginUser.id}`)
      })
  }

  return (
    <Box>
      {registration &&
        <OutinedButton onClick={submitRecommend}>
          私のおすすめにする
        </OutinedButton>
      }
    </Box>
  )
}
