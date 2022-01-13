import React from "react";
import { useHistory } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
import { styled } from '@mui/system';

const ChatRow = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
}));

const ChatReverse = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
}));

export const Message = ({
  message,
  loginUser,
  user,
}) => {
  const history = useHistory()

  return (
    <>
      {message.user_id === loginUser.id
        ?
        <ChatReverse key={message.id.toString()}>
          <ListItemAvatar>
            <Avatar
              cursor='pointer'
              src={loginUser.avatar_url}
              sx={{ cursor: 'pointer', height: 35, ml: 3, mt: 0.8, width: 35 }}
              onClick={() => history.push(`/users/${loginUser.id}`)}
            />
          </ListItemAvatar>
          <Box
            sx={{ border: 0.1, borderRadius: '4px', p: 1.5 }}>
            {message.content}
          </Box>
        </ChatReverse>
        :
        <ChatRow key={message.id.toString()}>
          <ListItemAvatar>
            <Avatar
              cursor='pointer'
              src={user.avatar_url}
              sx={{ width: 35, height: 35 }}
              onClick={() => history.push(`/users/${user.id}`)}
            />
          </ListItemAvatar>
          <Box sx={{ border: 0.1, borderRadius: '4px', p: 1.5 }}>
            {message.content}
          </Box>
        </ChatRow>
      }
    </>
  )
}
