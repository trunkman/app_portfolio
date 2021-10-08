import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { postSignUp } from '../apis/users';

// Forms
import { Name } from './Forms/Name';
import { Email } from './Forms/Email';
import { Password } from './Forms/Password';
import { PasswordConfirmation } from './Forms/PasswordConfirmation';

export const SignUpDialog = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')
  const history = useHistory()

  const handleSubmit = (event) => {
    postSignUp({
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((data) => {
      if (data.status === 'created') {
        props.handleLogin(data)
        history.push(`/user/${data.user.id}`)
      }
      else
        alert('入力内容に誤りがあります')
    })
    event.preventDefault() // 検討の余地あり
  };

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        新規登録
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、登録をお願いします。
        </DialogContentText>

        <Name
          name={name}
          handleChange={e => setName(e.target.value)}
        />
        <Email
          email={email}
          handleChange={e => setEmail(e.target.value)}
        />
        <Password
          password={password}
          handleChange={e => setPassword(e.target.value)}
        />
        <PasswordConfirmation
          passwordConfirmation={passwordConfirmation}
          handleChange={e => setpasswordConfirmaiton(e.target.value)}
        />

      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit} type='submit' autoFocus>新規登録</Button>
      </DialogActions>

    </Dialog>
  );
}
