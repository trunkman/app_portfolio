import React, { useState } from "react";
import { useHistory } from "react-router";
// Style
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { deleteMicropost } from "../../apis/microposts";
// Component
import { LikeButton } from "../Buttons/LikeButton";
import { CommentButton } from "../Buttons/CommentButton"
import { DeleteDialog } from "../Dialogs/DeleteDialog";

export const Micropost = ({
  commentCount,
  likeStatus,
  loginUser,
  micropost,
}) => {
  const history = useHistory();
  // 削除確認ダイアログの開閉
  const [open, setOpen] = useState({
    isOpen: false,
    micropostId: '',
  });
  const handleClose = () => setOpen({ isOpen: false });
  // 投稿を削除する
  const deleteSubmit = () => {
    deleteMicropost(open.micropostId)
    handleClose()
    alert('投稿を削除しました')
    history.push(`/users/${loginUser.id}`)
  }

  return (
    <>
      <ListItem
        key={micropost.id.toString()}
        sx={{
          display: 'flex',
          alignItems: "center",
          borderTop: 0.2,
        }}>
        <AccountCircle sx={{ fontSize: 35 }} />
        <Box sx={{
          py: 3,
          pl: 3,
          flexGrow: 1,
        }}>
          <Typography>
            【 {micropost.user_id} さん 】 {micropost.created_at}
          </Typography>
          <Typography variant="h6" sx={{ pl: 1 }}>
            <Box sx={{ letterSpacing: 2, mt: 2 }}>{micropost.content}</Box>
          </Typography>
        </Box>
        {loginUser.id === micropost.user_id && (
          <IconButton onClick={() => setOpen({ isOpen: true, micropostId: micropost.id })}>
            <DeleteOutlinedIcon />
          </IconButton>
        )}
        <LikeButton
          loginUserId={loginUser.id}
          micropostId={micropost.id}
          Status={likeStatus}
        />
        <CommentButton
          loginUserId={loginUser.id}
          micropostId={micropost.id}
          commentCount={commentCount}
        />
      </ListItem >
      <DeleteDialog
        handleClose={handleClose}
        handleDelete={deleteSubmit}
        message={'投稿を削除'}
        open={open.isOpen}
      />
    </>
  )
}
