import React, { useState } from 'react';
// ダイアログのstyle
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// api
import { postComment } from "../../apis/comments";
// Formsコンポーネント
import { Content } from '../Forms/Content';

export const CommentDialog = (props) => {
  const [content, setContent] = useState(null)
  // コメントを登録する関数
  const handleSubmit = () => {
    postComment({
      content: content,
      userId: props.loginUserId,
      micropostId: props.micropostId,
    })
      .then(() => {
        setContent(null)
        props.handleClose()
      })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        コメント
      </DialogTitle>
      <DialogContent>
        <Content
          content={content}
          handleChange={e => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.handleClose() }}>
          閉じる
        </Button>
        <Button type='submit' onClick={handleSubmit} >
          コメントする
        </Button>
      </DialogActions>
    </Dialog>
  );
}
