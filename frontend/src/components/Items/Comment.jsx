import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../App';
// Style
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Api
import { deleteComment } from '../../apis/comments';
import { fetchMicropost } from '../../apis/microposts';
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { DeleteDialog } from '../Dialogs/DeleteDialog';
import { MicropostDialog } from '../Dialogs/MicropostDialog';

const ListItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  marginTop: 2,
}));

const ListTitle = styled('box')(({ theme }) => ({
  fontWeight: 'bold',
  letterSpacing: theme.typography.body1.letterSpacing,
  lineHeight: 2,
  paddingBottom: 1,
}));

const ListBody = styled('box')(({ theme }) => ({
  fontWeight: 'light',
  letterSpacing: theme.typography.body1.letterSpacing,
  lineHeight: 2,
  paddingLeft: 6,
}));

const IconWrapper = styled('box')(({ }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: 10,
}));

export const Comment = ({
  comment,
  dataFetcing,
  user,
}) => {
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
    deleteComment(comment.id);
    handleClose();
    dataFetcing();
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
        <Box sx={{ py: 2, width: '100%' }} >
          <Typography>
            <ListTitle>【 {user.name} 】 {comment.created_at.substr(0, 16).replace('T', ' ')}</ListTitle>
          </Typography>
          <Typography>
            <ListBody
              onClick={handleClick}
              sx={{ cursor: 'pointer' }}
            >
              {comment.content}
            </ListBody>
          </Typography>
          <IconWrapper>
            {authState.loginUser.id === comment.user_id &&
              <IconButton onClick={() => dialogDispatch({ type: 'delete' })}>
                <DeleteOutlinedIcon />
              </IconButton>
            }
          </IconWrapper>
        </Box>
      </ListItemWrapper >

      <DeleteDialog
        handleClose={handleClose}
        handleDelete={deleteSubmit}
        message={'コメントを削除'}
        open={dialogState.delete}
      />
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
    </>
  )
}

