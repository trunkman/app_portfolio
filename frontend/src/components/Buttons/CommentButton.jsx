import React, { useState } from "react";
// styles
import { IconButton } from "@mui/material";
// アイコン
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
// コンポーネント
import { CommentDialog } from "../Dialogs/CommentDialog";

export const CommentButton = ({
  commentCount,
  loginUserId,
  micropostId,
}) => {
  const [open, setOpen] = useState(false)
  // ダイアログを開閉する関数群
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SmsOutlinedIcon />
        {commentCount}
      </IconButton>

      <CommentDialog
        handleClose={handleClose}
        open={open}
        loginUserId={loginUserId}
        micropostId={micropostId}
      />
    </>
  )
}
