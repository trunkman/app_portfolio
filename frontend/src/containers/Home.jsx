import React, { Fragment, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { fetchHome } from "../apis/home";
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInDialog } from "../components/LogInDialog"

export const Home = (props) => {

  const [open, setOpen] = useState({
    signUpDialog: false,
    logInDialog: false,
  })

  // 新規登録のDialogを開くCallback関数
  const handleClickOpenSignUp = () => {
    setOpen({ signUpDialog: true }, [setOpen])
  }

  // ログインのDialogを開くCallback関数
  const handleClickOpenLogIn = () => {
    setOpen({ logInDialog: true })
  }

  // 新規登録のDialogを閉じるCallback関数
  const handleCloseSignUp = () => {
    setOpen({ signUpDialog: false }, [setOpen])
  }

  // ログインのDialogを閉じるCallback関数
  const handleCloseLogIn = () => {
    setOpen({ logInDialog: false })
  }

  //Home画面の更新
  useEffect(() => {
    fetchHome()
  }, [])

  return (
    <Fragment>
      <h1>HOME画面</h1>

      <Button variant="outlined" onClick={handleClickOpenSignUp}>
        新規登録
        <SignUpDialog open={open.signUpDialog} handleClose={handleCloseSignUp} handleLogin={props.handleLogin} />
      </Button>

      <Button variant="outlined" onClick={handleClickOpenLogIn}>
        ログイン
        <LogInDialog open={open.logInDialog} handleClose={handleCloseLogIn} handleLogin={props.handleLogin} />
      </Button>

    </Fragment>
  )
}
