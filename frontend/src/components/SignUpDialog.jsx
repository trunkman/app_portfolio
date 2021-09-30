import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Name } from './Forms/Name';

export const SignUpDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        新規登録
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規登録</DialogTitle>
        <div>
          <Name />
          {/* <Email /> */}
          {/* <Password /> */}
          {/* <PasswordConfirmation /> */}
        </div>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleClose}>新規登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
