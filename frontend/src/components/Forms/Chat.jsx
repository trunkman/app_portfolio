import React, { useState } from "react";
// Style
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Divider } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Icon
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// Api
import { postMessage } from "../../apis/messages";

const useStyles = makeStyles(() =>
  createStyles({
    "chat": {
      background: '#001e3c',
      position: 'fixed',
      bottom: 15,
      textAlign: 'center',
      width: '600px',

    }
  }),
);

export const Chat = ({
  user_id,
  room_id,
  dataFetch,
}) => {
  const classes = useStyles();
  const [chat, setChat] = useState(null)
  const handleSubmit = () => {
    postMessage({
      content: chat,
      user_id: user_id,
      room_id: room_id,
    }).then(() => {
      setChat('')
      dataFetch()
    })
  }

  return (
    <Box className={classes.chat} >
      <Divider />
      <TextField
        autoFocus
        color="secondary"
        fullWidth
        margin="dense"
        multiline
        label="トーク入力"
        rows={3}
        onChange={e => setChat(e.target.value)}
        type="text"
        value={chat}
        variant="outlined"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
      >
        送信
        <DoubleArrowIcon />
      </Button>
    </Box>
  )
}
