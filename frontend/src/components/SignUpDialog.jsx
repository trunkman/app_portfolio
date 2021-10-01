import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// 入力フォーム
import { Name } from './Forms/Name';
import { Email } from './Forms/Email';
import { Password } from './Forms/Password';
import { PasswordConfirmation } from './Forms/PasswordConfirmation';
import { signUp } from '../apis/users';


export const SignUpDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    signUp(data)
      .then()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        新規登録
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規登録</DialogTitle>
        <DialogContent>
          <DialogContentText>
            下記項目を入力し、登録をお願いします。
          </DialogContentText>
          <Name />
          <Email />
          <Password />
          <PasswordConfirmation />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>新規登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
