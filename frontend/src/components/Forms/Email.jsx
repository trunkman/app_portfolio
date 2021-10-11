import React from 'react';
import TextField from '@mui/material/TextField';

export const Email = (props) => {

  // 返り値：Emailフォーム
  return (
    <TextField
      autoFocus
      margin="dense"
      // id="email"
      label="E-mail"
      type="email"
      required
      value={props.email}
      onChange={props.handleChange}
      fullWidth variant="standard"
    />
  )
}
