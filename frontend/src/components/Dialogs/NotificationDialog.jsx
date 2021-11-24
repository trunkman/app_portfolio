import React, { useState, useReducer } from 'react';
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Emoji } from 'emoji-mart';
// Reducer
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer'
// Api
import { postDiary } from '../../apis/diaries';

export const NotificationDialog = ({
  handleClose,
  open,
}) => {

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // 通知ダイアログを返す
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={paper}
      >
        <DialogTitle >通知</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Abc.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose() }}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
