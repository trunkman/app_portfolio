import React, { useState, useReducer } from 'react';
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Emoji } from 'emoji-mart';
// Reducer
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer'
// Api
import { postDiary } from '../../apis/diaries';

export const RecordDialog = ({
  handleClose,
  open,
}) => {
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);

  const tabChange = (event, newValue) => {
    recordDispatch({
      type: 'date',
      payload: newValue
    })
  };

  const handleSubmit = () => {
    postDiary({
      date: recordState.date,
      sleepingHours: recordState.sleepingHours,
      feeling: recordState.feeling,
    }).then(() => {
      recordDispatch({ type: 'reset' })
      handleClose()
    }).catch(() => {
      alert('記録失敗')
    })
  }

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Diary
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          睡眠時間と寝起きの気分を記録しましょう。
        </DialogContentText>

        <TextField
          fullWidth variant="standard"
          margin="dense"
          type="date"
          onChange={e => recordDispatch({
            type: 'date',
            payload: e.target.value
          })}
          value={recordState.date}
          required
        />

        <TextField
          autoFocus
          fullWidth variant="standard"
          label="睡眠時間（例：7.5)"
          margin="dense"
          type="number"
          onChange={e => recordDispatch({
            type: 'sleepingHours',
            payload: e.target.value
          })}
          value={recordState.sleepingHours}
          required
        />

        <Box sx={{ width: '100%' }}>
          <p>睡眠状態</p>
          <Tabs
            value={recordState.feeling}
            onChange={tabChange}
          >
            <Tab
              value="satisfied"
              label={<Emoji emoji="satisfied" size={32} />}
              wrapped
            />
            <Tab
              value="neutral_face"
              label={<Emoji emoji="neutral_face" size={32} />}
            />
            <Tab
              value="dizzy_face"
              label={<Emoji emoji="dizzy_face" size={32}
              />} />
          </Tabs>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => { handleClose() }}>
          閉じる
        </Button>
        <Button onClick={handleSubmit} type='submit'>
          日記を記録する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
