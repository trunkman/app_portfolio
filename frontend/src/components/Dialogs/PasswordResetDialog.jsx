import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
//api
import { postLogIn } from '../../apis/sessions';
// Formsコンポーネント
import { Email } from '../Forms/Email';
import { Password } from '../Forms/Password';
import { RememberMe } from '../Forms/RememberMe';

export const PasswordResetDialog = (props) => {
  const [email, setEmail] = useState('')

  const history = useHistory()
  const handleSubmit = () => {
  }

  // 返り値：新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        パスワード再設定画面
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          登録したメールアドレスを入力してください。
        </DialogContentText>
        <Email
          email={email}
          handleChange={e => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.handleClose() }}>
          閉じる
        </Button>
        <Button type='submit' onClick={handleSubmit}>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
