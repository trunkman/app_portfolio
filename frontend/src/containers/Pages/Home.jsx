import React, { useState, useReducer } from "react";
//styled
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@mui/material/Grid";
// アイコン
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// reducer
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer';
import { loginInitialState, loginReducer } from '../../reducer/LoginReducer';
// コンポーネント
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";
import { Typography } from "@mui/material";

export const Home = (props) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [openState, openDispatch] = useReducer(dialogReducer, dialogInitialState)

  const handleClose = () => openDispatch({ type: 'close' })
  const handleLogin = () => loginDispatch({ type: 'login' })
  const haddleOpenLogin = () => openDispatch({ type: 'login' })
  const handleOpenPasswordReset = () => openDispatch({ type: 'passwordReset' })
  const handleOpenSignup = () => openDispatch({ type: 'signup' })

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
            onClick={haddleOpenLogin}
          >
            ログイン
          </Button>
          <LogInDialog
            open={openState.login}
            handleClose={handleClose}
            handleLogIn={handleLogin}
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
