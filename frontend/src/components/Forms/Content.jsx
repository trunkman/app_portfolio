import React from 'react';
import TextField from '@mui/material/TextField';

export const Content = (props) => {

  // 返り値：Emailフォーム
  return (
    <TextField
      autoFocus
      margin="dense"
      // id="content"
      label="投稿内容"
      sx={{ m: 1, width: '50ch' }}
      type="text"
      required
      multiline
      rows={4}
      value={props.content}
      onChange={props.handleChange}
      fullWidth variant="standard"
    />
  )
}
