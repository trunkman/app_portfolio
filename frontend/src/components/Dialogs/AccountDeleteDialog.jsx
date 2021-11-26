import React from 'react';
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AcountDeleteDialog = () => {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"アカウントを削除してもよろしいですか？"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => { props.handleClose() }}>
            戻る
          </Button>
          <Button type='submit' onClick={() => { handleDelete() }} >
            アカウントを削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
