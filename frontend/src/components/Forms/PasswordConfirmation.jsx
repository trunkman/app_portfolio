import React from 'react';
import TextField from '@mui/material/TextField';

export const PasswordConfirmation = ({ passwordConfirmation, handleChange }) => {

  // 返り値：PasswordConfirmationフォーム
  return (
    <TextField
      fullWidth
      // id="passwordConfirmationForm"
      label="確認のため再度パスワードをご入力ください"
      margin="dense"
      onChange={handleChange}
      required
      type="password"
      value={passwordConfirmation}
      variant="standard"
    />
  )
}
