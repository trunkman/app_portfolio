import React from "react"
import TextField from '@mui/material/TextField';

export const PasswordConfirmation = () => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="password_confirmation"
      label="パスワードの確認"
      type="password"
      fullWidth
      variant="standard"
    />
  );
}
