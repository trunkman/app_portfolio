import React, { useState } from "react";
// Style
import { styled } from '@mui/system';
import { Divider } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Icon
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// Api
import { postMessage } from "../../apis/messages";

const ChatWrapper = styled('box')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  bottom: 5,
  padding: '10px',
  position: 'fixed',
  textAlign: 'center',
  width: 600,
}));

const ChatField = styled(TextField)(({ theme }) => ({
  background: '#334b63',
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-root': { color: 'white' },
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

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
    <ChatWrapper>
      <Divider />
      <ChatField
        autoFocus
        color="primary"
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
    </ChatWrapper>
  )
}
