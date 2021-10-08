import React, { Fragment, useState } from "react";

// コンポーネント
import { Header } from "../components/Header"

export const User = (props) => {
  const [openLogInDialog, setOpenLogInDialog] = useState(false)

  // ログインのDialogを開くCallback関数
  const handleOpenLogIn = () => {
    setOpenLogInDialog(true)
  }

  // ログインのDialogを閉じるCallback関数
  const handleCloseLogIn = () => {
    setOpenLogInDialog(false)
  }

  // 返り値：ユーザー画面
  return (
    <Fragment>
      <Header
        loggedInStatus={props.loggedInStatus}
        handleLogin={props.handleLogin}
        handleLogout={props.handleLogout}
        open={openLogInDialog}
        handleClose={handleCloseLogIn}
        handleClickOpenLogIn={handleOpenLogIn}
      />
      <h1>ユーザーページ</h1>
      <p>Idは{props.match.params.id}です</p>
      <p>名前は{props.user.name}です</p>
      <p>Emailは{props.user.email}です</p>
    </Fragment>
  )
}
