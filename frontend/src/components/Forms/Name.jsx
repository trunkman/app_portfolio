import React from "react"
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

export const Name = () => {
  <DialogContent>
    <DialogContentText>
      名前
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="name"
      type="text"
      fullWidth
      variant="standard"
    />
  </DialogContent>
}
