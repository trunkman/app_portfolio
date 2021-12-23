import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// Api
import { postMicropost } from '../../apis/microposts';
// Reducer
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { Content } from '../Forms/Content';

export const TweetDialog = ({
  open,
  handleClose,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  // 投稿を登録する
  const submitPost = () => {
    postDispatch({ type: 'posting' })
    postMicropost({
      content: postState.content,
      user_id: authState.loginUser.id,
    }).then(data => {
      postDispatch({ type: 'postSuccess' });
      handleClose()
      history.push(`/users/${authState.loginUser.id}`);
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        投稿画面
      </DialogTitle>
      <DialogContent>
        <Content
          content={postState.content}
          handleChange={e =>
            postDispatch({
              type: 'input',
              payload: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitPost} type='submit'  >
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
