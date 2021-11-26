import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteComment } from "../../apis/comments";

export const Comment = ({
  comment,
  loginUserId,
  userName,
}) => {

  // コメントを削除する
  const deleteSubmit = (commentId) => {
    deleteComment(commentId)
      .then(alert('コメントを削除する'))
  }

  return (
    <>
      <Box
        key={comment.id.toString()}
        sx={{
          display: 'flex',
          alignItems: "center",
          my: 4,
        }}>
        <AccountCircle />
        <Box sx={{ ml: 2 }}>
          <Typography>
            <b>{userName}</b>  {comment.created_at}
          </Typography>
          <Typography>
            {comment.content}
          </Typography>
        </Box>
        {loginUserId == comment.user_id && (
          <Link
            component="div"
            onClick={() => deleteSubmit(comment.id)}
          >
            削除
          </Link>
        )}
      </Box >
    </>
  )
}

