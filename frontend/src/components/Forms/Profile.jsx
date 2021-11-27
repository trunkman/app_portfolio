import React from 'react';
import TextField from '@mui/material/TextField';

export const Profile = ({ profile, handleChange }) => {

  return (
    <TextField
      autoFocus
      fullWidth
      label="プロフィール"
      margin="dense"
      onChange={handleChange}
      required
      type="text"
      value={profile}
      variant="standard"
    />
  )
}
