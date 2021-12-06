import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Component
import { DeleteDialog } from "../Dialogs/DeleteDialog";

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      background: '#334b63',
      border: 0,
      borderRadius: 4,
      color: 'white',
      height: 30,
      padding: '15px 20px',
      margin: '20px 7px'
    },
  }),
);

export const NotRecommendButton = ({ NotRecommend }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => setOpen(true)}
        >
          おすすめを解除
        </Button>
      </Box>
      <DeleteDialog
        handleClose={() => setOpen(false)}
        handleDelete={NotRecommend}
        message={'おすすめ本を解除'}
        open={open}
      />
    </>
  )
}
