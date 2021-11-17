import React from 'react';
import TextField from '@mui/material/TextField';

export const Name = ({ name, handleChange }) => {

  // 返り値：Nameフォーム
  return (
    <TextField
      autoFocus
      fullWidth
      // id="nameForm"
      label="お名前"
      margin="dense"
      onChange={handleChange}
      required
      type="text"
      value={name}
      variant="standard"
    />
  )
}
