import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';

// コンポーネント
import { Header } from "../components/Header"
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = (props) => {

  const [open, setOpen] = useState({
    signUpDialog: false,
    logInDialog: false,
  })

  // 新規登録のDialogを開くCallback関数
  const handleClickOpenSignUp = () => {
    setOpen({ signUpDialog: true })
  }

  // 新規登録のDialogを閉じるCallback関数
  const handleCloseSignUp = () => {
    setOpen({ signUpDialog: false })
  }

  // ログインのDialogを開くCallback関数
  const handleClickOpenLogIn = () => {
    setOpen({ logInDialog: true })
  }

  // ログインのDialogを閉じるCallback関数
  const handleCloseLogIn = () => {
    setOpen({ logInDialog: false })
  }

  return (
    <Fragment>
      <Header
        loggedInStatus={props.loggedInStatus}
        handleLogin={props.handleLogin}
        handleLogout={props.handleLogout}
        open={open.logInDialog}
        handleClose={handleCloseLogIn}
        handleClickOpenLogIn={handleClickOpenLogIn}
      />

      <h1>HOME画面</h1>

      <Button variant="outlined" onClick={handleClickOpenSignUp}>
        新規登録
        <SignUpDialog
          open={open.signUpDialog}
          handleClose={handleCloseSignUp}
          handleLogin={props.handleLogin}
        />
      </Button>

      <Button variant="outlined" onClick={handleClickOpenLogIn}>
        ログイン
        <LogInDialog
          open={open.logInDialog}
          handleClose={handleCloseLogIn}
          handleLogin={props.handleLogin}
        />
      </Button>

    </Fragment>
  )
}
