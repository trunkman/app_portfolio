import React, { useState } from 'react';
// ダイアログのstyle
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// api
import { postMicropost } from '../apis/microposts';
// Formsコンポーネント
import { Content } from './Forms/Content';

export const MicropostDialog = (props) => {
  const [content, setContent] = useState('')

  // 投稿apiを呼び出すCallback関数
  const handleSubmit = () => {
    postMicropost({
      content: content,
      user_id: props.user.id
    }).then(data => {
      setContent('')
      props.handleClose()
    })
  }

  // 返り値：投稿ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        投稿画面
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
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
