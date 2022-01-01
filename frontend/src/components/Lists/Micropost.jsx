import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { fetchMicropost, deleteMicropost } from "../../apis/microposts";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { LikeButton } from "../Buttons/LikeButton";
import { CommentButton } from "../Buttons/CommentButton";
import { DeleteDialog } from "../Dialogs/DeleteDialog";
import { MicropostDialog } from "../Dialogs/MicropostDialog";

export const Micropost = ({
  commentCount,
  likeStatus,
  micropost,
  user,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  const dialogClose = () => dialogDispatch({ type: 'close' });
  // 投稿詳細(コメント付き)を取得する
  const fetchDetailMicropost = () => {
    postDispatch({ type: 'fetching' })
    fetchMicropost(micropost.id)
      .then(data => {
        postDispatch({
          type: 'fetchSuccess',
          payload: {
            micropost: data.micropost,
            user: data.user,
            comments: data.comments,
            likeStatus: data.likeStatus,
          }
        });
        dialogDispatch({ type: 'micropost' });
      });
  }
  // 投稿を削除する
  const deleteSubmit = () => {
    deleteMicropost(micropost.id)
    dialogClose()
    history.push(`/users/${authState.loginUser.id}`)
  }

  return (
    <>
      <ListItem
        key={micropost.id.toString()}
        sx={{
          alignItems: "center",
          borderTop: 0.2,
          my: 1,
          display: 'flex',
        }}>
        <ListItemAvatar>
          <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{ width: 35, height: 35 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box
          onClick={fetchDetailMicropost}
          sx={{ py: 2, flexGrow: 1 }}
        >
          <Typography>
            【 {user.name} さん 】 {micropost.created_at.substr(0, 19).replace('T', ' ')}
          </Typography>
          <Typography variant="h6" sx={{ pl: 1 }}>
            <Box sx={{ letterSpacing: 2, mt: 2 }}>{micropost.content}</Box>
            {micropost.image_url &&
              <CardMedia
                alt='Image'
                component='img'
                image={micropost.image_url}
                sx={{ width: 200, mt: 2 }}
              />
            }
          </Typography>
        </Box>
        {authState.loginUser.id === micropost.user_id && (
          <IconButton onClick={() => dialogDispatch({ type: 'delete' })}>
            <DeleteOutlinedIcon />
          </IconButton>
        )}
        <LikeButton
          loginUserId={authState.loginUser.id}
          micropostId={micropost.id}
          Status={likeStatus}
        />
        <CommentButton
          commentCount={commentCount}
          loginUserId={authState.loginUser.id}
          micropostId={micropost.id}
        />
      </ListItem >

      <MicropostDialog
        comments={postState.comments}
        handleClose={dialogClose}
        loginUser={authState.loginUser}
        micropost={micropost}
        open={dialogState.micropost}
        user={user}
      />
      <DeleteDialog
        handleClose={dialogClose}
        handleDelete={deleteSubmit}
        message={'投稿を削除'}
        open={dialogState.delete}
      />
    </>
  )
}
