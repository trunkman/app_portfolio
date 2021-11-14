import React from 'react';
import TextField from '@mui/material/TextField';

export const Email = (props) => {

  // 返り値：Emailフォーム
  return (
    <TextField
      fullWidth variant="standard"
      label="E-mail"
      margin="dense"
      // id="email"
      type="email"
      onChange={props.handleChange}
      value={props.email}
      required
    />
  )
}
