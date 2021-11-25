import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../../apis/microposts";
// コンポーネント

export const Comment = ({
  commentedMicroposts,
  loginUser,
  user,
}) => {
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: "center",
        my: 4,
      }}>
        <AccountCircle />
        <Box sx={{ ml: 2 }}>
          <Typography>
            <b>{user.name}</b>  {props.comment.created_at}
          </Typography>
          <Typography>
            {comment.content}
          </Typography>
        </Box>
        {loginUser.id == comment.user_id && (
          <Link
            component="div"
            onClick={() => deleteSubmit(props.micropost.id)}
          >
            削除
          </Link>
        )}
      </Box >
    </>
  )
}

