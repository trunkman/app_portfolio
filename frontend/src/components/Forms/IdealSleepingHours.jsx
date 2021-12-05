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

export const IdealSleepingHours = ({ idealSleepingHours, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textfield}
      label="目標睡眠時間"
      margin="dense"
      onChange={handleChange}
      required
      type="number"
      value={idealSleepingHours}
      variant="standard"
    />
  )
}
