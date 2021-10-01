import React from "react"
import TextField from '@mui/material/TextField';

export const Email = () => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="email"
      label="E-mail"
      type="email"
      fullWidth
      variant="standard"
    />
  );
}
