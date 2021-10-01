import React from "react"
import TextField from '@mui/material/TextField';

export const Password = () => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="password"
      label="パスワード"
      type="password"
      fullWidth
      variant="standard"
    />
  );
}
