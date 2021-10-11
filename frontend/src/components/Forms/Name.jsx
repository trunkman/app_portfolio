import React from 'react';
import TextField from '@mui/material/TextField';

export const Name = (props) => {

  // 返り値：Nameフォーム
  return (
    <TextField
      autoFocus
      margin="dense"
      // id="name"
      label="名前"
      type="text"
      required
      value={props.name}
      onChange={props.handleChange}
      fullWidth
      variant="standard"
    />
  )
}
