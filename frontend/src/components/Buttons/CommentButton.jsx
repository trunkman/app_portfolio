import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// Icon
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
// Component
import { CommentDialog } from "../Dialogs/CommentDialog";

export const CommentButton = ({
  commentCount,
  dataFetcing,
  loginUserId,
  micropostId,
}) => {
  const [open, setOpen] = useState(false)
  // ダイアログを開閉する関数群
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <Box sx={{
      display: 'flex',
      ml: 2,
    }}>
      <IconButton onClick={handleOpen}>
        <SmsOutlinedIcon />
      </IconButton>
      <Typography sx={{ pl: 1 }} >
        {commentCount}
      </Typography>
      <CommentDialog
        dataFetcing={dataFetcing}
        handleClose={handleClose}
        open={open}
        loginUserId={loginUserId}
        micropostId={micropostId}
      />
    </Box>
  )
}
