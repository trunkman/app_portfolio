import React from 'react';
import TextField from '@mui/material/TextField';

export const Password = (props) => {

  // 返り値：Passwordフォーム
  return (
    <TextField
      autoFocus
      margin="dense"
      id="password"
      label="パスワード"
      type="password"
      required
      value={props.password}
      onChange={props.handleChange}
      fullWidth
      variant="standard"
    />
  )
}
