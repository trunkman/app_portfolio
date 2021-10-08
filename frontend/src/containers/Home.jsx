import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';

// コンポーネント
import { Header } from "../components/Header"
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = (props) => {
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const [openLogInDialog, setOpenLogInDialog] = useState(false)

  // 新規登録のDialogを開くCallback関数
  const handleOpenSignUp = () => {
    setOpenSignUpDialog(true)
  }

  // 新規登録のDialogを閉じるCallback関数
  const handleCloseSignUp = () => {
    setOpenSignUpDialog(false)
  }

  // ログインのDialogを開くCallback関数
  const handleOpenLogIn = () => {
    setOpenLogInDialog(true)
  }

  // ログインのDialogを閉じるCallback関数
  const handleCloseLogIn = () => {
    setOpenLogInDialog(false)
  }

  return (
    <Fragment>
      <Header
        open={openLogInDialog}
        handleClickOpenLogIn={handleOpenLogIn}
        handleClose={handleCloseLogIn}
        loggedInStatus={props.loggedInStatus}
        handleLogin={props.handleLogin}
        handleLogout={props.handleLogout}
      />

      <h1>HOME画面</h1>

      <Button
        variant="outlined"
        onClick={handleOpenSignUp}
      >
        新規登録
        <SignUpDialog
          open={openSignUpDialog}
          handleClose={handleCloseSignUp}
          handleLogin={props.handleLogin}
        />
      </Button>

      <Button
        variant="outlined"
        onClick={handleOpenLogIn}
      >
        ログイン
        <LogInDialog
          open={openLogInDialog}
          handleClose={handleCloseLogIn}
          handleLogin={props.handleLogin}
        />
      </Button>

    </Fragment>
  )
}
