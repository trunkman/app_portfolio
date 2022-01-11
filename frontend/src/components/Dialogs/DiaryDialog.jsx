import React, { useContext } from 'react';
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography";
// Api
import { patchDiary, deleteDiary } from '../../apis/diaries';
//Component
import { Date } from '../Forms/Date';
import { SleepingHours } from '../Forms/SleepingHours'
import { Feeling } from '../Forms/Feeling'

export const DiaryDialog = ({
  handleClose,
  open,
  recordDispatch,
  recordState,
  userId,
}) => {
  const diaryId = recordState.id
  const { authState } = useContext(AuthContext);

  // 日記を更新する
  const submitUpdate = () => {
    patchDiary({
      diaryId: diaryId,
      date: recordState.date,
      sleepingHours: recordState.sleepingHours,
      feeling: recordState.feeling,
    }).then(() => {
      recordDispatch({ type: 'reset' });
      handleClose();
    });
  }

  // 日記を削除する
  const submitDelete = () => {
    deleteDiary(diaryId)
      .then(() => {
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
        <Typography variant="h5">
          <Box sx={{ letterSpacing: 3, pt: 2 }}><b>睡眠日記</b></Box>
        </Typography>
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
        {authState.loginUser.id !== userId &&
          <>
            <Button onClick={submitDelete} type='submit'>
              削除
            </Button>
            <Button onClick={submitUpdate} type='submit'>
              更新
            </Button>
          </>
        }
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
