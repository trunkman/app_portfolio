import React from "react";
// Style
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      background: '#0288d1',
      border: 0,
      borderRadius: 50,
      color: 'white',
      height: 30,
      padding: '15px 20px',
      margin: '15px 0px'
    }
  }),
);

export const BookSearchButton = ({ handleSubmit }) => {
  const classes = useStyles();

  return (
    <Box>
      <Button
        className={classes.button}
        variant="contained"
        type='submit'
        onClick={handleSubmit}
      >
        検索する
      </Button>
    </Box>
  )
}
