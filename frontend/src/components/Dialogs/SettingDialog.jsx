import React, { useState } from 'react';
// ダイアログのstyles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// api
import { patchUpdate } from '../../apis/users';
// Formsコンポーネント
import { Name } from '../Forms/Name';
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { PasswordConfirmation } from '../Forms/PasswordConfirmation';

export const SettingDialog = (props) => {
  const [name, setName] = useState(props.user.name)
  const [email, setEmail] = useState(props.user.email)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmaiton] = useState('')
  // 送信のCallback関数
  const handleSubmit = () => {
    patchUpdate({
      user_id: props.user.id,
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((data) => {
      alert('ユーザー情報を更新しました')
      props.handleClose()
      props.dataFetching()
    }).catch(() => {
      alert('ユーザー情報の更新失敗')
    })
  }

  // Settingダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>プロフィールを編集する</DialogTitle>
      <DialogContent>
        <DialogContentText>
          変更したい項目を入力し、「更新」を押してください。
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
          handleChange={e => setPasswordConfirmaiton(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.handleClose() }}>
          閉じる
        </Button>
        <Button onClick={handleSubmit} type='submit'>
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
}
