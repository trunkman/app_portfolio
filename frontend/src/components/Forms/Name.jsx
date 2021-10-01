import React from "react";
import TextField from '@mui/material/TextField';

export const Name = () => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="名前"
      type="text"
      fullWidth
      variant="standard"
    />
  );
}
