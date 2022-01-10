import React from "react";
import { useHistory } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
import { styled } from '@mui/system';
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const ChatRow = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: 550,
}));

const ChatReverse = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  width: 550,
}));

export const Message = ({
  message,
  loginUser,
  user,
}) => {
  const history = useHistory()

  return (
    <>
      <ListItem key={message.id.toString()}>
        {message.user_id === loginUser.id ? (
          <ChatReverse>
            <ListItemAvatar>
              <Avatar
                cursor='pointer'
                src={loginUser.avatar_url}
                sx={{ cursor: 'pointer', height: 35, ml: 3, mt: 0.8, width: 35 }}
                onClick={() => history.push(`/users/${loginUser.id}`)}
              />
            </ListItemAvatar>
            <Box
              sx={{
                p: 1.5,
                border: 0.1,
                borderRadius: '4px',
              }}>
              {message.content}
            </Box>
          </ChatReverse>
        ) : (
          <ChatRow>
            <ListItemAvatar>
              <Avatar
                cursor='pointer'
                src={user.avatar_url}
                sx={{ width: 35, height: 35 }}
                onClick={() => history.push(`/users/${user.id}`)}
              />
            </ListItemAvatar>
            <Box
              sx={{
                p: 1.5,
                border: 0.1,
                borderRadius: '4px',
              }}>
              {message.content}
            </Box>
          </ChatRow>
        )}
      </ListItem >
    </>
  )
}
