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

export const Email = ({ email, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      className={classes.textfield}
      label="メール"
      margin="dense"
      onChange={handleChange}
      required
      type="email"
      value={email}
      variant="standard"
    />
  )
}
