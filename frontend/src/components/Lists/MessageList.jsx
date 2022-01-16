import React from "react";
// Style
import { styled } from '@mui/system';
import ListItemText from "@mui/material/ListItemText";
// Components
import { Message } from "../Items/Message";

const MessageWrapper = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  flexGrow: 1,
  height: '100%',
  marginBottom: 150,
  maxWidth: 600,
  width: '100%',
}));

export const MessageList = ({
  messageState,
  messageDelete,
  loginUser,
}) => {

  return (
    <MessageWrapper>
      {messageState.messages.length === 0 &&
        <ListItemText sx={{ pt: 4 }}>
          <h3>トークを始めましょう。</h3>
        </ListItemText>
      }

      {messageState.messages.length !== 0 &&
        messageState.messages.map((message) =>
          <Message
            messageDelete={messageDelete}
            message={message}
            loginUser={loginUser}
            user={messageState.user}
          />
        )
      }
    </MessageWrapper>
  )
}
