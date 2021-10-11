import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//api
import { postLogIn } from '../apis/sessions';

// ダイアログのstyle
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// Formsコンポーネント
import { Email } from './Forms/Email';
import { Password } from './Forms/Password';
import { RememberMe } from './Forms/RememberMe';

export const LogInDialog = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remenberMe, setRememberMe] = useState('1')
  const history = useHistory()

  // ログインapiを呼び出すCallback関数
  const handleSubmit = () => {
    postLogIn({
      email: email,
      password: password,
      remember_me: remenberMe,
    }).then(data => {
      props.handleLogIn(data);
      setEmail('');
      setPassword('');
      history.push(`/user/${data.user.id}`);
    })
  }

  // 返り値：新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        ログイン
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、ログインください。
        </DialogContentText>
        <Email
          email={email}
          handleChange={e => setEmail(e.target.value)}
        />
        <Password
          password={password}
          handleChange={e => setPassword(e.target.value)}
        />
        <RememberMe
          remenberMe={remenberMe}
          handleChange={e => setRememberMe(e.target.checked)}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button
          type='submit'
          onClick={handleSubmit}
          autoFocus
        >
          ログイン
        </Button>
      </DialogActions>
    </Dialog>
  );
}
