import React from 'react';
import TextField from '@mui/material/TextField';

export const SleepingHours = ({ sleepingHours, handleChange }) => {

  return (
    <TextField
      fullWidth
      label="睡眠時間（例：7.5)"
      margin="dense"
      onChange={handleChange}
      required
      type="number"
      value={sleepingHours}
      variant="standard"
    />
  )
}
