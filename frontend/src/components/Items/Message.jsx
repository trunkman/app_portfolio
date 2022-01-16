import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
// Style
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar"
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/system';
// Icon
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
// Components
import { DeleteDialog } from "../Dialogs/DeleteDialog";

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
  messageDelete,
  loginUser,
  user,
}) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);

  return (
    <>
      {message.user_id === loginUser.id &&
        <ChatReverse key={message.id.toString()}>
          <ListItemAvatar>
            <Avatar
              cursor='pointer'
              src={loginUser.avatar_url}
              sx={{ cursor: 'pointer', height: 35, ml: 3, mt: 0.8, width: 35 }}
              onClick={() => history.push(`/users/${loginUser.id}`)}
            />
          </ListItemAvatar>
          <Box sx={{ border: 0.1, borderRadius: '4px', p: 1.5 }}>
            {message.content}
          </Box>
          {authState.loginUser.id === message.user_id && (
            <IconButton onClick={() => dialogDispatch({ type: 'delete' })}>
              <DeleteOutlinedIcon sx={{ mx: 1, mt: 3 }} />
            </IconButton>
          )}
        </ChatReverse>
      }

      {message.user_id !== loginUser.id &&
        <ChatRow key={message.id.toString()}>
          <ListItemAvatar>
            <Avatar
              cursor='pointer'
              src={user.avatar_url}
              sx={{ width: 35, height: 35 }}
              onClick={() => history.push(`/users/${user.id}`)}
            />
          </ListItemAvatar>
          <Box sx={{ border: 0.1, borderRadius: '4px', p: 1.5, width: '100vm' }}>
            {message.content}
          </Box>
        </ChatRow>
      }

      <DeleteDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        handleDelete={() => messageDelete(message.id)}
        message={'メッセージを削除'}
        open={dialogState.delete}
      />
    </>
  )
}
