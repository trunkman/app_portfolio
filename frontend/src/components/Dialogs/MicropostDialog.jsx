import React, { useContext, useReducer } from 'react';
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// Api
import { fetchMicropost } from '../../apis/microposts';
// Reducer
import { postReducer, postInitialState } from '../../reducer/PostReducer'
// Component
import { Loading } from "../../components/Loading"

export const MicropostDialog = ({
  handleClose,
  micropost,
  open,
  user,
}) => {
  const { authState } = useContext(AuthContext);
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);
  // 投稿内容&そのコメントを取得する
  const Micropost = () => {
    postDispatch({ type: 'fetching' })
    fetchMicropost(micropost.id)
      .then(data => {
        postDispatch({
          type: 'fetchSuccess',
          payload: {
            micropost: data.micropost,
            comments: data.comments,
            likeStatus: data.likeStatus,
          }
        });
      });
  }

  useEffect(() => {
    Micropost()
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        <Micropost
          commentCount={postState.comments.length}
          likeStatus={postState.likeStatus}
          loginUserId={authState.loginUser.id}
          micropost={postState.micropost}
          user={user}
        />
      </DialogTitle>
      <DialogContent>
        <h3>コメント</h3>
        {
          postState.fetchState != 'ok' ? <Loading /> :
            postState.comments.map(comment =>
              <Comment
                comment={comment.comment}
                loginUser={authState.loginUser}
                userName={comment.user.name}
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
