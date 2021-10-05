import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { postLogIn } from '../apis/users';


export const LogInDialog = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 情報を送信し、ログインするCallback関数
  const handleSubmit = () => {
    postLogIn({
      email: email,
      password: password,
    }).then((data) => {
      if (data.status === 'created') {
        props.handleLogin(data)
        alert('ログインしました')
        props.handleClose()
      }
      else
        alert('メールアドレスまたはパスワードに誤りがあります');
    })
  };

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、ログインください。
        </DialogContentText>

        <TextField autoFocus margin="dense" id="email" label="E-mail" type="email"
          required value={email} onChange={e => setEmail(e.target.value)} fullWidth variant="standard" />

        <TextField autoFocus margin="dense" id="password" label="パスワード" type="password"
          required value={password} onChange={e => setPassword(e.target.value)} fullWidth variant="standard" />

      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit}>ログイン</Button>
      </DialogActions>

    </Dialog>
  );
}
