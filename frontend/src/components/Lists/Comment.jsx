import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { deleteComment } from "../../apis/comments";
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";


export const Comment = ({
  comment,
  loginUserId,
  userName,
}) => {
  // 削除確認ダイアログの開閉
  const [open, setOpen] = useState({
    isOpen: false,
    commentId: '',
  });
  const handleClose = () => setOpen({ isOpen: false });
  // コメントを削除する
  const deleteSubmit = (commentId) => {
    deleteComment(commentId)
    handleClose();
    alert('コメントを削除しました')
  }

  return (
    <>
      <ListItem
        key={comment.id.toString()}
        sx={{
          display: 'flex',
          alignItems: "center",
          mt: 4,
          borderTop: 0.2,
        }}>
        <AccountCircle sx={{ fontSize: 35 }} />
        <Box sx={{
          pt: 2,
          pl: 3,
          flexGrow: 1,
        }}>
          <Typography>
            【 {userName} さん 】 {comment.created_at}
          </Typography>
          <Typography variant="h6" sx={{ pl: 1 }}>
            <Box sx={{ letterSpacing: 2, my: 2 }}>{comment.content}</Box>
          </Typography>
        </Box>
        {loginUserId === comment.user_id && (
          <IconButton onClick={() => setOpen({ isOpen: true, commentId: comment.id })}>
            <DeleteOutlinedIcon />
          </IconButton>
        )}
      </ListItem >
      <DeleteDialog
        handleClose={handleClose}
        handleDelete={deleteSubmit}
        message={'コメントを削除'}
        open={open.isOpen}
      />
    </>
  )
}

