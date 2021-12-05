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

export const Password = ({ password, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textfield}
      fullWidth
      label="パスワード"
      margin="dense"
      onChange={handleChange}
      required
      type="password"
      value={password}
      variant="standard"
    />
  )
}
