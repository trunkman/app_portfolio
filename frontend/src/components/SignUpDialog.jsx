import React, { useState } from 'react';
import { useHistory } from 'react-router';

// api
import { postSignUp } from '../apis/users';

// ダイアログのstyles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// Formsコンポーネント
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

  const handleSubmit = () => {
    postSignUp({
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((data) => {
      props.handleLogIn(data.user)
      setName('')
      setEmail('')
      setPassword('')
      setpasswordConfirmaiton('')
      history.push(`/user/${data.user.id}`)
    }).catch(() => {
      alert('登録失敗')
    })
  }

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
          下記項目を入力し「登録する」を押してください。
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
        <Button onClick={() => { props.handleClose() }}>キャンセル</Button>
        <Button
          onClick={handleSubmit}
          type='submit'
          autoFocus
        >
          登録する
        </Button>
      </DialogActions>

    </Dialog>
  );
}
