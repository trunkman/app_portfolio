import React, { useState } from 'react';
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

// api
import { postDiary } from '../../apis/diaries';

export const DiaryDialog = (props) => {
  const [date, setDate] = useState(Date.now())
  const [sleepingHours, setSleepingHours] = useState(null)
  const [feeling, setFeeling] = useState('good')
  const handleChange = (event, newValue) => {
    setFeeling(newValue);
  };

  const handleSubmit = () => {
    postDiary({
      date: date,
      sleepingHours: sleepingHours,
      feeling: feeling,
    }).then(() => {
      setDate(Date.now())
      setSleepingHours(null)
      setFeeling(null)
      props.handleClose()
    }).catch(() => {
      alert('記録失敗')
    })
  }

  // 新規登録ダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
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
          onChange={e => setDate(e.target.value)}
          value={date}
          required
        />

        <TextField
          autoFocus
          fullWidth variant="standard"
          label="睡眠時間（例：7.5)"
          margin="dense"
          type="number"
          onChange={e => setSleepingHours(e.target.value)}
          value={sleepingHours}
          required
        />

        <Box sx={{ width: '100%' }}>
          <p>睡眠状態</p>
          <Tabs
            value={feeling}
            onChange={handleChange}
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
        <Button onClick={() => { props.handleClose() }}>
          閉じる
        </Button>
        <Button onClick={handleSubmit} type='submit'>
          日記を記録する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
