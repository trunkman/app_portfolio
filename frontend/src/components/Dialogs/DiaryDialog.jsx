import React, { useEffect, useState } from 'react';
// Style
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// Api
import { patchDiary } from '../../apis/diaries';
//Component
import { Date } from '../Forms/Date';
import { SleepingHours } from '../Forms/SleepingHours'
import { Feeling } from '../Forms/Feeling'



export const DiaryDialog = ({
  handleClose,
  open,
  recordDispatch,
  recordState,
}) => {

  // 日記を更新する
  const submitUpdate = () => {
    patchDiary({
      diaryId: recordState.id,
      date: recordState.date,
      sleepingHours: recordState.sleepingHours,
      feeling: recordState.feeling,
    }).then(() => {
      recordDispatch({ type: 'reset' });
      handleClose();
    });
  }


  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        睡眠日記
      </DialogTitle>

      <DialogContent>
        <Date
          date={recordState.date}
          handleChange={e => recordDispatch({
            type: 'date',
            payload: e.target.value
          })}
        />
        <SleepingHours
          sleepingHours={recordState.sleepingHours}
          handleChange={e => recordDispatch({
            type: 'sleepingHours',
            payload: e.target.value
          })}
        />
        <Feeling
          feeling={recordState.feeling}
          recordDispatch={recordDispatch}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={submitUpdate} type='submit'>
          更新する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
