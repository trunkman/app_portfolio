import React from 'react';
import TextField from '@mui/material/TextField';

export const PasswordConfirmation = (props) => {

  // 返り値：PasswordConfirmationフォーム
  return (
    <TextField
      margin="dense"
      // id="password_confirmation"
      label="パスワードの確認"
      type="password"
      value={props.passwordConfirmation}
      onChange={props.handleChange}
      fullWidth variant="standard"
    />
  )
}
