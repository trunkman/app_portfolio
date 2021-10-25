import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';

// コンポーネント
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInButton } from "../components/Buttons/LogInButton";

export const Home = (props) => {
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
  // 新規登録Dialogを開閉する関数
  const handleOpenSignUp = () => setOpenSignUpDialog(true)
  const handleCloseSignUp = () => setOpenSignUpDialog(false)
  // ログインDialogを開閉する関数
  const handleOpenLogIn = () => setOpenLogInDialog(true)
  const handleCloseLogIn = () => setOpenLogInDialog(false)

  // 返り値：HOME画面
  return (
    <Fragment>
      <h1>HOME画面</h1>
      <Button
        variant="outlined"
        onClick={handleOpenSignUp}
      >
        新規登録
      </Button>
      <SignUpDialog
        open={openSignUpDialog}
        handleClose={handleCloseSignUp}
        handleLogIn={props.handleLogIn}
      />

      <LogInButton
        handleOpen={handleOpenLogIn}
        open={openLogInDialog}
        handleClose={handleCloseLogIn}
        handleLogIn={props.handleLogIn}
      />
    </Fragment>
  )
}
