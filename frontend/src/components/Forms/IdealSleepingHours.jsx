import React from 'react';
import TextField from '@mui/material/TextField';

export const IdealSleepingHours = ({ idealSleepingHours, handleChange }) => {

  return (
    <TextField
      label="目標睡眠時間"
      margin="dense"
      onChange={handleChange}
      required
      type="number"
      value={idealSleepingHours}
      variant="standard"
    />
  )
}
