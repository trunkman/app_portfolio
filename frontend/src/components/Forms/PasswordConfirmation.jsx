import React from 'react';
import TextField from '@mui/material/TextField';

export const PasswordConfirmation = ({ passwordConfirmation, handleChange }) => {

  return (
    <TextField
      fullWidth
      label="パスワード（再確認用）"
      margin="dense"
      onChange={handleChange}
      required
      type="password"
      value={passwordConfirmation}
      variant="standard"
    />
  )
}
