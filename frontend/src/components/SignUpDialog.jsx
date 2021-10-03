import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { postSignUp } from '../apis/users';


export const SignUpDialog = ({ open, handleClose, handleLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')

  const handleSubmit = (event) => {
    postSignUp({
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((data) => {
      if (data.status === 'created') {
        handleLogin(data)
        alert('送信完了しました')
        handleClose()
      }
      else
        alert('入力内容に謝りがあります');
    })
    event.preventDefault()
  };

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>新規登録</DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、登録をお願いします。
        </DialogContentText>

        <TextField autoFocus margin="dense" id="name" label="名前" type="text"
          required value={name} onChange={e => setName(e.target.value)} fullWidth variant="standard" />

        <TextField autoFocus margin="dense" id="email" label="E-mail" type="email"
          required value={email} onChange={e => setEmail(e.target.value)} fullWidth variant="standard" />

        <TextField autoFocus margin="dense" id="password" label="パスワード" type="password"
          required value={password} onChange={e => setPassword(e.target.value)} fullWidth variant="standard" />

        <TextField autoFocus margin="dense" id="password_confirmation" label="パスワードの確認" type="password"
          required value={passwordConfirmation} onChange={e => setpasswordConfirmaiton(e.target.value)} fullWidth variant="standard" />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit}>新規登録</Button>
      </DialogActions>

    </Dialog>
  );
}
