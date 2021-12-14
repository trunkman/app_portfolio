import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { deleteComment } from "../../apis/comments";
import { fetchMicropost } from "../../apis/microposts";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";
import { MicropostDialog } from "../Dialogs/MicropostDialog";

export const Comment = ({
  comment,
  user,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  const handleClose = () => dialogDispatch({ type: 'close' });
  // 投稿詳細(コメント付き)を取得する
  const Micropost = () => {
    postDispatch({ type: 'fetching' })
    fetchMicropost(comment.micropost_id)
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
      });
  }
  // コメントを削除する
  const deleteSubmit = () => {
    deleteComment(comment.id)
    handleClose();
    history.push(`/users/${authState.loginUser.id}`)
  }
  // クリック時、投稿詳細を表示する
  const handleClick = () => {
    Micropost();
    dialogDispatch({ type: 'micropost' });
  }

  return (
    <>
      <ListItem
        key={comment.id.toString()}
        sx={{
          display: 'flex',
          alignItems: "center",
          my: 1,
          borderTop: 0.2,
        }}>
        <ListItemAvatar>
          <AccountCircle sx={{ fontSize: 35 }} />
        </ListItemAvatar>
        <Box
          onClick={handleClick}
          sx={{ pt: 2, flexGrow: 1 }}
        >
          <Typography>
            【 {user.name} さん 】 {comment.created_at.substr(0, 19).replace('T', ' ')}
          </Typography>
          <Typography variant="h6" sx={{ pl: 1 }}>
            <Box sx={{ letterSpacing: 2, my: 2 }}>{comment.content}</Box>
          </Typography>
        </Box>
        {authState.loginUser.id === comment.user_id && (
          <IconButton onClick={() => dialogDispatch({ type: 'delete' })}>
            <DeleteOutlinedIcon />
          </IconButton>
        )}
      </ListItem >

      {postState.micropost !== '' &&
        <MicropostDialog
          comments={postState.comments}
          handleClose={handleClose}
          loginUser={authState.loginUser}
          micropost={postState.micropost}
          open={dialogState.micropost}
          user={postState.user}
        />
      }
      <DeleteDialog
        handleClose={handleClose}
        handleDelete={deleteSubmit}
        message={'コメントを削除'}
        open={dialogState.delete}
      />
    </>
  )
}

