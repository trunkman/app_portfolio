import React, { useState } from "react";
// styles
import { Divider } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// アイコン
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// api
import { postMessage } from "../../apis/messages";

export const Chat = (props) => {
  const [chat, setChat] = useState(null)
  const handleSubmit = () => {
    postMessage({
      content: chat,
      user_id: props.user_id,
      room_id: props.room_id,
    }).then(() => {
      setChat('')
      props.dataFatching()
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
