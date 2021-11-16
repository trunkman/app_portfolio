import React, { useState, useReducer, useContext } from "react";
import { AuthContext } from "../../App";
//styled
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@mui/material/Grid";
// アイコン
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// api
import { postLogIn } from '../../apis/sessions';
// reducer
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer';
// コンポーネント
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";
import { Typography } from "@mui/material";

export const Home = (props) => {
  const [openState, openDispatch] = useReducer(dialogReducer, dialogInitialState)
  const { authState, authDispatch } = useContext(AuthContext)

  const handleClose = () => openDispatch({ type: 'close' })
  // const handleLogin = () => loginDispatch({ type: 'login' })
  const haddleOpenLogin = () => openDispatch({ type: 'login' })
  const handleOpenPasswordReset = () => openDispatch({ type: 'passwordReset' })
  const handleOpenSignup = () => openDispatch({ type: 'signup' })

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: '1',
    openSignup: false,
    openLogin: false,
  };
  const [state, setState] = useState(initialState);

  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    })
  }

  const submitLogin = () => {
    postLogIn({
      email: state.email,
      password: state.password,
      remember_me: state.remenberMe,
    }).then(data => {
      handleLogin(data)
      setState({ openLogin: false })
    }
    )
  }


  // ホームへ返す
  return (
    <>
      <Box sx={{ overflow: 'hidden' }}>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Skeleton variant="rect" width={400} height={200} />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          my: 2
        }}>
          <Button variant="contained" sx={{ mr: 3 }}
            onClick={handleOpenSignup}
          >
            新規登録
          </Button>
          <SignUpDialog
            open={openState.signup}
            handleClose={handleClose}
            handleLogIn={handleLogin}
          />
          <Button variant="contained" sx={{ mr: 3 }}
            onClick={setState({ openSignup: true })}
          >
            ログイン
          </Button>
          <LogInDialog
            open={openState.login}
            handleClose={setState({ openSignup: false })}
            handleLogIn={submitLogin}
            handlePasswordReset={handleOpenPasswordReset}
          />
          <PasswordResetDialog
            open={openState.passwordReset}
            handleClose={handleClose}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',

        }}>

          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">日記</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">タイムライン</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">睡眠本</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">ニュース</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">フォロー</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">メッセージ</Typography>
            </Button>
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ width: 200, height: 200, p: 4 }}>
              <PermIdentityIcon />
              <Typography variant="h5">プロフィール</Typography>
            </Button>
          </Grid>

        </Box>

      </Box>
    </>
  )
}
