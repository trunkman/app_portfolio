import React from 'react';
import TextField from '@mui/material/TextField';

export const Profile = ({ profile, handleChange }) => {

  return (
    <TextField
      fullWidth
      label="プロフィール"
      multiline
      margin="dense"
      onChange={handleChange}
      required
      rows={3}
      type="text"
      value={profile}
      variant="standard"
    />
  )
}
