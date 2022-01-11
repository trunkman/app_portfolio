import React from 'react';
//Style
import TextField from '@mui/material/TextField';

export const Date = ({ date, handleChange }) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      onChange={handleChange}
      required
      type="date"
      value={date}
      variant="standard"
    />
  )
}
