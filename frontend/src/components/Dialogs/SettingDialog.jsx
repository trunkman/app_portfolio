import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router";
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
import { IdealSleepingHours } from '../Forms/IdealSleepingHours';
import { Profile } from '../Forms/Profile';

export const SettingDialog = ({
  handleClose,
  open,
}) => {
  const history = useHistory();
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
      handleClose()
      history.push(`/users/${authState.loginUser.id}`)
    })
  }

  useEffect(() => {
    authDispatch({
      type: 'preUpdate',
      payload: {
        name: authState.loginUser.name,
        email: authState.loginUser.email,
        password: authState.loginUser.password,
        passwordConfirmation: authState.loginUser.passwordConfirmation,
        idealSleepingHours: authState.loginUser.idealSleepingHours,
        profile: authState.loginUser.profile,
      }
    });
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>プロフィール編集</DialogTitle>
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
        <Ideal_sleeping_hours
          email={authState.idealSleepingHours}
          handleChange={e =>
            authDispatch({
              type: 'idealSleepingHours',
              payload: e.target.value,
            })
          }
        />
        <Profile
          email={authState.profile}
          handleChange={e =>
            authDispatch({
              type: 'ideal_sleeping_hours',
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
