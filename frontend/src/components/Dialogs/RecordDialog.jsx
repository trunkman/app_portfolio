import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../App";
// styles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// Api
import { postDiary } from '../../apis/diaries';
//Component
import { Date } from '../Forms/Date';
import { SleepingHours } from '../Forms/SleepingHours'
import { Feeling } from '../Forms/Feeling'

export const RecordDialog = ({
  handleClose,
  open,
  recordDispatch,
  recordState,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);

  // 日記を作成する
  const submitDiary = () => {
    postDiary({
      date: recordState.date,
      sleepingHours: recordState.sleepingHours,
      feeling: recordState.feeling,
    }).then(() => {
      recordDispatch({ type: 'reset' });
      handleClose();
      history.push(`/users/${authState.loginUser.id}/diaries`);
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
        <DialogContentText>
          睡眠時間と寝起きの気分を記録しましょう。
        </DialogContentText>
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
        <Button onClick={() => handleClose()}>
          閉じる
        </Button>
        <Button onClick={submitDiary} type='submit'>
          記録する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
