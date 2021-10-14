import React, { Fragment, useState, useEffect } from "react";
// ユーザーページのstyle
import Button from '@mui/material/Button';
// コンポーネント
import { Header } from "../components/Header"
import { SettingDialog } from "../components/SettingDialog";

export const User = (props) => {
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  const [openSettingDialog, setOpenSettingDialog] = useState(false)

  // ログインのDialogを開くCallback関数
  const handleOpenLogIn = () => {
    setOpenLogInDialog(true)
  }

  // ログインのDialogを閉じるCallback関数
  const handleCloseLogIn = () => {
    setOpenLogInDialog(false)
  }

  // 設定のDialogを開くCallback関数
  const handleOpenSetting = () => {
    setOpenSettingDialog(true)
  }

  // 設定のDialogを閉じるCallback関数
  const handleCloseSetting = () => {
    setOpenSettingDialog(false)
  }

  // 返り値：ユーザー画面
  return (
    <Fragment>
      <Header
        open={openLogInDialog}
        handleClickOpenLogIn={handleOpenLogIn}
        handleClose={handleCloseLogIn}
        loggedInStatus={props.loggedInStatus}
        handleLogIn={props.handleLogIn}
        handleLogOut={props.handleLogOut}
      />
      <h1>ユーザーページ</h1>
      <p>Idは{props.match.params.id}です</p>
      <p>名前は{props.user.name}です</p>
      <p>Emailは{props.user.email}です</p>
      {
        (props.loggedInStatus === 'ログイン中')
          ? (
            <Button
              variant="outlined"
              onClick={handleOpenSetting}
            >
              設定（ユーザー情報の更新）
              <SettingDialog
                open={openSettingDialog}
                handleClose={handleCloseSetting}
                user={props.user}
              />
            </Button>
          )
          : (
            <p>設定変更不可</p>
          )
      }
    </Fragment>
  )
}
