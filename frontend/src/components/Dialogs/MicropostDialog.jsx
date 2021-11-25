import React, { useReducer } from 'react';
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// Api
import { fetchMicroposts } from '../../apis/users';
// Reducer
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { comments } from '../../urls';


export const MicropostDialog = ({
  open,
  handleClose,
  micropost,
}) => {

  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  // 投稿内容&そのコメントを取得する
  const Micropost = () => {
    postDispatch({ type: 'fetching' })
    fetchMicropost(micropost.id)
      .then(data => {
        postDispatch({
          type: 'fetchSuccess',
          payload: {
            micropost: micropost,
            comments: comments,
            liked: liked,
          }
        })
      })
  }

  useEffect(() => {
    Micropost()
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        <Micropost
          likedStatus={postState.liked}
          loginUserId={loginUser.id}
          micropost={postState.micropost}
        />
      </DialogTitle>
      <DialogContent>
        <h3>コメント</h3>
        {comments.length != 0 &&
          comments.map(comment =>
            <Comment
              loginUserId={loginUser.id}
              comment={postState.comment}
            />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
