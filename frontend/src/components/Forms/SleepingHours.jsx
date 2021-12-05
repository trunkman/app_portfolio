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

export const SleepingHours = ({ sleepingHours, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textfield}
      fullWidth
      label="睡眠時間（例：7.5)"
      margin="dense"
      onChange={handleChange}
      required
      type="number"
      value={sleepingHours}
      variant="standard"
    />
  )
}
