import React, { useState, useReducer } from "react";
//styled
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@material-ui/lab/Skeleton';
// reducer
import { dialogInitialState, dialogReducer } from '../../reducer/DialogReducer'
import { loginInitialState, loginReducer } from '../../reducer/LoginReducer'
// コンポーネント
import { SignUpDialog } from "../../components/Dialogs/SignUpDialog";
import { LogInDialog } from "../../components/Dialogs/LogInDialog";
import { PasswordResetDialog } from "../../components/Dialogs/PasswordResetDialog";

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
      <Box sx={{ bgcolor: 'grey.300', overflow: 'hidden', p: 1, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, }}>
          <Skeleton variant="rect" width={450} height={300} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
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
      </Box>
    </>
  )
}
