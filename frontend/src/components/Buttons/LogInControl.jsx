import React from "react";

export const LogInControl = (props) => {
  return (
    props.loggedInStatus === "ログイン中"
      ? (
        <Button
          color="inherit"
          onClick={props.handleClickLogout} >
          ログアウト
        </Button>
      )
      : (
        <Button
          color="inherit"
          onClick={props.handleClickOpenLogIn}>
          ログイン
          <LogInDialog
            open={props.open}
            handleClose={props.handleCloseLogIn}
            handleLogin={props.handleLogin}
          />
        </Button>
      )
  )
}
