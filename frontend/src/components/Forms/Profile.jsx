import React from 'react';
//Style
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';

const useStyles = makeStyles(() =>
  createStyles({
    "textfield": {
      "& .MuiInputBase-root": { color: '#fff' }
    },
  }),
);

export const Profile = ({ profile, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textfield}
      fullWidth
      color='secondary'
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
