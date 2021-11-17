import React, { useReducer, useContext } from 'react';
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

export const MicropostDialog = ({
  open,
  handleClose,
}) => {

  const { authState } = useContext(AuthContext);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  const submitPost = () => {
    postMicropost({
      content: postState.content,
      user_id: authState.loginUser.id,
    }).then(data => {
      postDispatch({ type: 'reset' });
      handleClose()
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
              type: 'content',
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
