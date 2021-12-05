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

export const Content = ({ content, handleChange }) => {
  const classes = useStyles();

  return (
    <TextField
      autoFocus
      className={classes.textfield}
      fullWidth variant="standard"
      label="投稿内容"
      margin="dense"
      multiline
      onChange={handleChange}
      required
      rows={4}
      sx={{ m: 1, width: '50ch' }}
      type="text"
      value={content}
    />
  )
}
