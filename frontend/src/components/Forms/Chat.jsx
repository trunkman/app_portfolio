import React, { useState } from "react";
// Style
import { Divider } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Icon
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// Api
import { postMessage } from "../../apis/messages";

export const Chat = ({
  user_id,
  room_id,
  dataFetch,
}) => {
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
    <>
      <Divider />
      <TextField
        autoFocus
        margin="dense"
        type="text"
        multiline
        rows={3}
        value={chat}
        onChange={e => setChat(e.target.value)}
        fullWidth
        variant="standard"
      />
      {/* <MessageButton /> */}
      <Button
        onClick={handleSubmit}
        variant="contained"
      >
        送信
        <DoubleArrowIcon />
      </Button>
    </>
  )
}
