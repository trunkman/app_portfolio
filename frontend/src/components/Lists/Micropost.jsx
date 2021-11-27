import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router";
// api
import { deleteMicropost } from "../../apis/microposts";
// コンポーネント
import { LikeButton } from "../../components/Buttons/LikeButton";
import { CommentButton } from "../../components/Buttons/CommentButton"
import { DeleteDialog } from "../../Dialogs/DeleteDialog";

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

  // 投稿を削除する
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
    history.push(`/users/${loginUser.id}`)
  }

  return (
    <>
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
            onClick={() => setOpen({ isOpen: true, roomId: micropost.id })}
          >
            削除
          </Link>
        )}
      </Box >

      <DeleteDialog
        handleClose={() => setOpen({ isOpen: false })}
        handleDelete={deleteSubmit(open.micropostId)}
        message={'投稿を削除'}
        open={open.isOpen}
      />
    </>
  )
}
