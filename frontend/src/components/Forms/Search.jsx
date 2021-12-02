import React from "react";
// Styles
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
// Icon
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignItems: 'center',
      display: 'flex',
    }
  }),
);

export const Search = ({
  handleChange,
  keyword,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField
        autoFocus
        label="書籍名を入力してください"
        margin="dense"
        // id="bookSerch"
        sx={{ width: '50ch' }}
        type="text"
        onChange={handleChange}
        value={keyword}
        required
        variant="standard"
      />
    </Box>
  )
}
