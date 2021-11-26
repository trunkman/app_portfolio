import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../../apis/microposts";
// コンポーネント
import { LikeButton } from "../../components/Buttons/LikeButton";
import { CommentButton } from "../../components/Buttons/CommentButton"

export const Micropost = ({
  commentCount,
  likeStatus,
  loginUser,
  micropost,
}) => {
  // 投稿を削除する
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
  }

  return (
    <Box
      key={micropost.id.toString()}
      sx={{
        display: 'flex',
        alignItems: "center",
        my: 4,
      }}>
      <AccountCircle />

      <Box sx={{ ml: 2 }}>
        <Typography>
          <b>{loginUser.name}</b>
          <p>{micropost.created_at}</p>
        </Typography>
        <Typography>
          {micropost.content}
        </Typography>
      </Box>

      <Box sx={{ ml: 2 }}>
        <LikeButton
          loginUserId={loginUser.id}
          micropostId={micropost.id}
          Status={likeStatus}
        />
      </Box>

      <Box sx={{ ml: 2 }}>
        <CommentButton
          loginUserId={loginUser.id}
          micropostId={micropost.id}
          commentCount={commentCount}
        />
      </Box>

      {loginUser.id === micropost.user_id && (
        <Link
          component="div"
          onClick={() => deleteSubmit(micropost.id)}
        >
          削除
        </Link>
      )}
    </Box >
  )
}
