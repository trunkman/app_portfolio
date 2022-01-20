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
  letterSpacing: theme.typography.h6.letterSpacing,
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

  // ゲスト用にログインする
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
      <Box sx={{ textAlign: 'center' }} >
        <Typography sx={{ pb: 2 }}>
          <TitleTag>
            "睡眠時間"の確保を手助けする<br />
            webサービス
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
