import React from 'react';
import TextField from '@mui/material/TextField';

export const Content = ({ content, handleChange }) => {

  return (
    <TextField
      autoFocus
      fullWidth variant="standard"
      label="投稿内容"
      margin="dense"
      multiline
      onChange={handleChange}
      required
      rows={4}
      sx={{ m: 1, width: '50ch' }}
      type="text"
      value={content}
    />
  )
}
