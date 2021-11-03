import React, { useState } from "react";
// styles
import { IconButton } from "@mui/material";
// アイコン
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
// コンポーネント
import { CommentDialog } from "../Dialogs/CommentDialog";

export const CommentButton = (props) => {
  const [open, setOpen] = useState(false)
  // ダイアログを開閉する関数群
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SmsOutlinedIcon />
      </IconButton>
      <CommentDialog
        handleClose={handleClose}
        open={open}
        loginUserId={props.loginUserId}
        micropostId={props.micropostId}
      />
    </>
  )
}
