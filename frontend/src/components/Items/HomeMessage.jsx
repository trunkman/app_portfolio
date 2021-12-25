import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
// Api
import { postLogIn } from '../../apis/sessions';

const useStyles = makeStyles({
  'button': {
    background: '#0288d1',
    border: 0,
    borderRadius: 4,
    color: 'white',
    height: 30,
    padding: '15px 20px',
    margin: '15px 0px'
  }
});

export const HomeMessage = ({
  handleOpenLogin,
  handleOpenSignup,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { authDispatch } = useContext(AuthContext);
  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    })
  }
  // ゲスト用のログインapi
  const guestLogin = () => {
    postLogIn({
      email: 'guest@example.com',
      password: 'foobar',
      remenber_me: 1
    }).then(data => {
      handleLogin(data);
      history.push('/');
    })
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', }} >
        <Typography variant="h5" component="div" >
          <Box sx={{ letterSpacing: 4 }}>"睡眠負債"の返済を手助けする救済サービス</Box>
        </Typography>
        <Typography variant="h1" component="div" >
          <Box sx={{ letterSpacing: 6, my: 2 }}>睡眠補完計画</Box>
        </Typography>
      </Box >
      <Box sx={{
        mt: 6,
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>
        <Button
          className={classes.button}
          onClick={() => handleOpenSignup()}
        >
          新規登録
        </Button>
        <Button
          className={classes.button}
          onClick={() => handleOpenLogin()}
        >
          ログイン
        </Button>
        <Button
          className={classes.button}
          onClick={guestLogin}
        >
          ゲストログイン
        </Button>
      </Box>
    </>
  )
}
