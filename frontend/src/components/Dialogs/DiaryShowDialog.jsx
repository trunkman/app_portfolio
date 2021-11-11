import React, { useState } from 'react';
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// api

export const DiaryShowDialog = (props) => {

  const handleSubmit = () => {
    // 編集ダイアログにアクセスする関数
  }

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        {props.date}DBから引き出す
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          睡眠時間を表示する
        </DialogContentText>
        <DialogContentText>
          睡眠した気分を表示する
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} type='submit'>
          編集する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
