import React from 'react';
import TextField from '@mui/material/TextField';

export const Password = ({ password, handleChange }) => {

  return (
    <TextField
      fullWidth
      label="パスワード"
      margin="dense"
      onChange={handleChange}
      required
      type="password"
      value={password}
      variant="standard"
    />
  )
}
