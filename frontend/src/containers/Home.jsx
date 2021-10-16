import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';

// コンポーネント
import { SignUpDialog } from "../components/SignUpDialog"
import { LogInButton } from "../components/Buttons/LogInButton";

export const Home = (props) => {
  // 新規登録Dialogを開閉する関数
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const handleOpenSignUp = () => setOpenSignUpDialog(true)
  const handleCloseSignUp = () => setOpenSignUpDialog(false)
  // ログインDialogを開閉する関数
  const [openLogInDialog, setOpenLogInDialog] = useState(false)
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
        <SignUpDialog
          open={openSignUpDialog}
          handleClose={handleCloseSignUp}
          handleLogIn={props.handleLogIn}
        />
      </Button>

      <LogInButton
        handleOpen={handleOpenLogIn}
        open={openLogInDialog}
        handleClose={handleCloseLogIn}
        handleLogIn={props.handleLogIn}
      />
    </Fragment>
  )
}
