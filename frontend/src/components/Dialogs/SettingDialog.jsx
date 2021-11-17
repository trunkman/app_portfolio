import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../../App";
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// Api
import { patchUpdate } from '../../apis/users';
// Component
import { Name } from '../Forms/Name';
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { PasswordConfirmation } from '../Forms/PasswordConfirmation';

export const SettingDialog = ({
  dataUserFetch,
  handleClose,
  open,
}) => {
  const { authState, authDispatch } = useContext(AuthContext)

  // 送信のCallback関数
  const submitUpdate = () => {
    patchUpdate({
      user_id: authState.loginUser.id,
      name: authState.name,
      email: authState.email,
      password: authState.password,
      password_confirmation: authState.passwordConfirmation,
    }).then(data => {
      alert('ユーザー情報を更新しました')
      dataUserFetch()
      handleClose()
    }).catch(() => {
      alert('ユーザー情報の更新失敗')
    })
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>プロフィールを編集する</DialogTitle>
      <DialogContent>
        <DialogContentText>
          変更したい項目を入力し、「更新」を押してください。
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
              type: 'name',
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitUpdate} type='submit'>
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
}
