import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
// api
import { postLogIn } from '../../apis/sessions';
// Formsコンポーネント
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { RememberMe } from '../Forms/RememberMe';

export const LogInDialog = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remenberMe, setRememberMe] = useState('1')
  const history = useHistory()
  const handleSubmit = () => {
    postLogIn({
      email: email,
      password: password,
      remember_me: remenberMe,
    }).then(data => {
      if (data.user) {
        props.handleLogIn(data.user)
        setEmail('')
        setPassword('')
        props.handleClose()
        history.push(`/users/${data.user.id}`)
      }
    })
  }

  // 返り値：新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        ログイン画面
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、ログインください。
        </DialogContentText>
        <Email
          email={email}
          handleChange={e => setEmail(e.target.value)}
        />
        <Typography
          variant="body1"
        // onClick={() =>  }
        >
          パスワードを忘れてしまった方はこちら
        </Typography>
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
        <Button onClick={() => { props.handleClose() }}>
          閉じる
        </Button>
        <Button type='submit' onClick={handleSubmit}>
          ログインする
        </Button>
      </DialogActions>
    </Dialog>
  );
}
