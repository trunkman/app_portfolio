import React from 'react';
import TextField from '@mui/material/TextField';

export const Email = ({ email, handleChange }) => {

  // 返り値：Emailフォーム
  return (
    <TextField
      fullWidth
      label="E-mail"
      margin="dense"
      onChange={handleChange}
      required
      type="email"
      value={email}
      variant="standard"
    />
  )
}
