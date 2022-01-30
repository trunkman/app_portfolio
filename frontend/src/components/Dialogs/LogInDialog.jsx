import React, { useContext } from 'react';
import { AuthContext } from "../../App";
// Style
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

  // ログインする
  const handleLogin = (data) => {
    authDispatch({
      type: 'login',
      payload: data.user,
    })
  }

  // ログインするデータを送り、ログインする
  const submitLogin = () => {
    postLogIn({
      email: authState.email,
      password: authState.password,
      remember_me: authState.rememberMe ? '1' : '0',
    }).then(data => {
      data.logged_in && handleLogin(data);
      handleClose();
    });
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
          component="div"
          variant="body2"
          onClick={() => handlePasswordReset()}
          sx={{ cursor: 'pointer', pb: 2 }}
        >
          パスワードを忘れてしまった方はこちら
        </Link>
        <RememberMe
          rememberMe={authState.rememberMe}
          handleChange={e =>
            authDispatch({
              type: 'rememberMe',
              payload: e.target.checked,
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
