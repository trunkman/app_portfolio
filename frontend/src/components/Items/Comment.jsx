import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
// Icon
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

const ListItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
  paddingLeft: 6,
}));

export const Comment = ({ comment, user }) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  // ダイアログを閉じる
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
      <ListItemWrapper key={comment.id.toString()}>
        <ListItemAvatar>
          <Avatar
            src={user.avatar_url}
            sx={{ cursor: 'pointer', height: 35, width: 35 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box
          onClick={handleClick}
          sx={{ cursor: 'pointer', flexGrow: 1, py: 2 }}
        >
          <Typography>
            【 {user.name} 】 {comment.created_at.substr(0, 16).replace('T', ' ')}
          </Typography>
          <Typography variant="h6" sx={{ pl: 1 }}>
            <ListBody>{comment.content}</ListBody>
          </Typography>
        </Box>
        {authState.loginUser.id === comment.user_id && (
          <IconButton onClick={() => dialogDispatch({ type: 'delete' })}>
            <DeleteOutlinedIcon />
          </IconButton>
        )}
      </ListItemWrapper >

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

