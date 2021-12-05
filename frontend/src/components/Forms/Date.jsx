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

export const Date = ({ date, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      className={classes.textfield}
      margin="dense"
      onChange={handleChange}
      required
      type="date"
      value={date}
      variant="standard"
    />
  )
}
