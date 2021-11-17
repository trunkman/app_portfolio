import React from 'react';
import TextField from '@mui/material/TextField';

export const Password = ({ password, handleChange }) => {

  // 返り値：Passwordフォーム
  return (
    <TextField
      fullWidth
      // id="passwordForm"
      label="パスワード"
      margin="dense"
      onChange={handleChange}
      type="password"
      value={password}
      variant="standard"
    />
  )
}
