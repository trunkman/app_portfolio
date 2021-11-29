import React, { useReducer } from 'react';
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// Reducer
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer'
// Api
import { postDiary } from '../../apis/diaries';
//Component
import { Date } from '../Forms/Date';
import { SleepingHours } from '../Forms/SleepingHours'
import { Feeling } from '../Forms/Feeling'

export const RecordDialog = ({
  handleClose,
  open,
}) => {
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);

  // 日記を作成する
  const submitDiary = () => {
    postDiary({
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
        Diary
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          睡眠時間と寝起きの気分を記録しましょう。
        </DialogContentText>

        <Date
          date={recordState.date}
          handleChange={e => recordDispatch({
            type: 'date',
            payload: e.target.value
          })
          }
        />

        <SleepingHours
          sleepingHours={recordState.sleepingHours}
          handleChange={e => recordDispatch({
            type: 'sleepingHours',
            payload: e.target.value
          })
          }
        />

        <Feeling
          feeling={recordState.feeling}
          recordDispatch={recordDispatch}
        />

      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitDiary} type='submit'>
          日記を記録する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
