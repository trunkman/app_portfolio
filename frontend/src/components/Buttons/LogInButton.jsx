import React from "react";
import { Button } from "@mui/material";

// コンポーネント
import { LogInDialog } from "../LogInDialog";

export const LogInButton = (props) => {
  return (
    <Button
      color="inherit"
      onClick={props.handleOpen}
    >
      ログイン
      <LogInDialog
        open={props.open}
        handleClose={props.handleClose}
        handleLogIn={props.handleLogIn}
      />
    </Button>
  )
}
