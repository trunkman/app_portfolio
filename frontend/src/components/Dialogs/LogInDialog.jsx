import React, { useContext } from 'react';
import { AuthContext } from "../../App";
// style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Link from '@mui/material/Link';
// Api
import { postLogIn } from '../../apis/sessions';
// Components
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { RememberMe } from '../Forms/RememberMe';

export const LogInDialog = ({
  handleClose,
  handlePasswordReset,
  open,
}) => {
  const { authState, authDispatch } = useContext(AuthContext);

  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    })
  }

  const submitLogin = () => {
    postLogIn({
      email: authState.email,
      password: authState.password,
      remember_me: authState.remenberMe,
    }).then(data => {
      handleLogin(data)
      handleClose()
    }).catch(() => {
      alert('ログイン失敗')
    })
  }

  // ログインのダイアログを返す
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        ログイン画面
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          下記項目を入力し、ログインください。
        </DialogContentText>
        <Email
          email={authState.email}
          handleChange={e =>
            authDispatch({
              type: 'email',
              payload: e.target.value,
            })
          }
        />
        <Password
          password={authState.password}
          handleChange={e =>
            authDispatch({
              type: 'password',
              payload: e.target.value,
            })
          }
        />
        <Link
          component="button"
          variant="body2"
          onClick={() => handlePasswordReset()}
        >
          パスワードを忘れてしまった方はこちら
        </Link>
        <RememberMe
          remenberMe={authState.remenberMe}
          handleChange={e =>
            authDispatch({
              type: 'rememberMe',
              payload: (e.target.value)
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitLogin} type='submit'>
          ログインする
        </Button>
      </DialogActions>
    </Dialog>
  );
}
