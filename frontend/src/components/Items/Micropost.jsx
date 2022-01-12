import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";
// Style
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { styled } from '@mui/system';
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

const ListItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  marginTop: 2,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 2,
  paddingLeft: 6,
}));

const IconWrapper = styled('box')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: 10,
}));

export const Micropost = ({
  commentCount,
  likeStatus,
  micropost,
  dataFetcing,
  user,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  // ダイアログを閉じる
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
      .then(() => {
        dialogClose();
        dataFetcing();
      })
  }

  return (
    <>
      <ListItemWrapper key={micropost.id.toString()}>
        <ListItemAvatar >
          <Avatar
            src={user.avatar_url}
            sx={{ cursor: 'pointer', height: 35, width: 35 }}
            onClick={() => history.push(`/users/${user.id}`)}
          />
        </ListItemAvatar>
        <Box
          onClick={fetchDetailMicropost}
          sx={{ cursor: 'pointer', flexGrow: 1, py: 2 }}
        >
          <Typography>
            【 {user.name} 】 {micropost.created_at.substr(0, 16).replace('T', ' ')}
          </Typography>
          <Typography variant="h6">
            <ListBody>{micropost.content}</ListBody>
            {micropost.image_url &&
              <CardMedia
                alt='Image'
                component='img'
                image={micropost.image_url}
                sx={{ mt: 2, maxHeight: 300, width: 200 }}
              />
            }
          </Typography>
        </Box>
        <IconWrapper>
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
            dataFetcing={dataFetcing}
            loginUserId={authState.loginUser.id}
            micropostId={micropost.id}
          />
        </IconWrapper>
      </ListItemWrapper >
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
