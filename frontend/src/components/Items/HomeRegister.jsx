import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Api
import { postLogIn } from '../../apis/sessions';

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  margin: '15px 0px',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
}));

const TitleTag = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
}));

export const HomeRegister = ({
  handleOpenLogin,
  handleOpenSignup,
}) => {
  const history = useHistory();
  const { authState, authDispatch } = useContext(AuthContext);

  // ログインする
  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    })
  }

  // ゲスト用のログインする
  const guestLogin = () => {
    postLogIn({
      email: 'guest@example.com',
      password: 'foobar',
      remember_me: 1
    }).then(data => {
      handleLogin(data);
      history.push('/');
    })
  }

  return (
    <Box sx={{ flexDirection: 'column' }}>
      <Box sx={{ textAlign: 'center', pb: 3 }} >
        <Typography sx={{ pb: 2 }}>
          <TitleTag>
            "睡眠負債"の返済を手助けする<br />
            救済サービス
          </TitleTag>
        </Typography>
        <Typography>
          <Title>
            睡眠補完計画
          </Title>
        </Typography>
      </Box>
      {!authState.loggedIn &&
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          mb: 3,
        }}>
          <ContainedButton onClick={() => handleOpenSignup()}>
            新規登録
          </ContainedButton>
          <ContainedButton onClick={() => handleOpenLogin()}>
            ログイン
          </ContainedButton>
          <ContainedButton onClick={guestLogin}>
            ゲストログイン
          </ContainedButton>
        </Box>
      }
    </Box >
  )
}
