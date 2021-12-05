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

export const Name = ({ name, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      className={classes.textfield}
      label="お名前"
      margin="dense"
      onChange={handleChange}
      required
      type="text"
      value={name}
      variant="standard"
    />
  )
}
