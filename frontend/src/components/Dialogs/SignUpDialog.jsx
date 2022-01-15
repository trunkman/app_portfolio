import React, { useContext, useState } from 'react';
import { AuthContext } from "../../App";
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// Api
import { postSignUp } from '../../apis/users';
// Component
import { Name } from '../Forms/Name';
import { Email } from '../Forms/Email';
import Loading from '../Items/Loading';
import { Password } from '../Forms/Password';
import { PasswordConfirmation } from '../Forms/PasswordConfirmation';
import { RememberMe } from '../Forms/RememberMe';
import { IdealSleepingHours } from '../Forms/IdealSleepingHours';

export const SignUpDialog = ({
  handleClose,
  open,
}) => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  // 新規登録のアカウント有効化メールを送る
  const submitSignup = () => {
    setLoading(true);
    postSignUp({
      name: authState.name,
      email: authState.email,
      password: authState.password,
      password_confirmation: authState.passwordConfirmation,
      idealSleepingHours: authState.idealSleepingHours,
      remember_me: authState.remenberMe,
    }).then(data => {
      setLoading(false);
      alert(data.message);
      handleClose();
    }).catch(() => {
      setLoading(false);
      alert('登録失敗');
    })
  }

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>
        新規登録
      </DialogTitle>
      <DialogContent>
        {loading ? <Loading /> :
          <>
            <DialogContentText>
              下記項目を入力し「登録する」を押してください。
            </DialogContentText>
            <Name
              name={authState.name}
              handleChange={e =>
                authDispatch({
                  type: 'name',
                  payload: e.target.value,
                })
              }
            />
            <Email
              email={authState.email}
              handleChange={e =>
                authDispatch({
                  type: 'email',
                  payload: e.target.value,
                })
              }
            />
            <IdealSleepingHours
              idealSleepingHours={authState.idealSleepingHours}
              handleChange={e =>
                authDispatch({
                  type: 'idealSleepingHours',
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
            <PasswordConfirmation
              passwordConfirmation={authState.passwordConfirmation}
              handleChange={e =>
                authDispatch({
                  type: 'passwordConfirmation',
                  payload: e.target.value,
                })
              }
            />
            <RememberMe
              remenberMe={authState.remenberMe}
              handleChange={e =>
                authDispatch({
                  type: 'rememberMe',
                  payload: (e.target.value)
                })
              }
            />
          </>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitSignup} type='submit'>
          登録する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
