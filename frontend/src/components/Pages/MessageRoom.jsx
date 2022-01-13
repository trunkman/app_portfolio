import React, { useEffect, useReducer } from "react";
// Style
import { styled } from '@mui/system';
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// Api
import { fetchMessages } from "../../apis/rooms"
// Reducer
import { messageInitialState, messageReducer } from '../../reducer/MessageReducer';
// Cpmponent
import { Chat } from "../../components/Forms/Chat";
import { Message } from "../Items/Message";
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 600,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const MessageWrapper = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  flexGrow: 1,
  height: '100%',
  marginBottom: 150,
  maxWidth: 600,
  width: '100%',
}));

export const MessageRoom = ({
  roomId,
  loginUser,
}) => {
  const [messageState, messageDispatch] = useReducer(messageReducer, messageInitialState)

  // トークルームのメッセージ一覧を取得する
  const Messages = () => {
    fetchMessages(roomId)
      .then(data => {
        messageDispatch({
          type: 'fetchSuccess',
          payload: {
            messages: data.messages,
            user: data.user,
          }
        });
      });
  }

  useEffect(() => {
    Messages();
  }, [messageState.reRender])

  return (
    <Container>
      <Typography>
        <Title>{messageState.user.name}</Title>
      </Typography>
      {messageState.fetchState !== 'ok' ? <Loading /> :
        <List sx={{ width: '100%' }}>
          <MessageWrapper>
            {messageState.messages.length === 0 ? (
              <ListItemText sx={{ pt: 4 }}>
                <h3>トークしている人はいません。</h3>
              </ListItemText>
            ) : (
              messageState.messages.map((message) =>
                <Message
                  message={message}
                  loginUser={loginUser}
                  user={messageState.user}
                />
              )
            )}
          </MessageWrapper>
        </List>
      }
      <Chat
        user_id={loginUser.id}
        room_id={roomId}
        dataFetch={() => messageDispatch({ type: 'fetching' })}
      />
    </Container>
  )
}
