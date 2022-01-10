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
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 2,
}));

const MessageWrapper = styled('box')(() => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  flexGrow: 1,
  width: '100%',
  height: '100%',
  overflow: "auto",
  marginBottom: 150,
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
      <Typography variant="h3">
        <Title>{messageState.user.name}</Title>
      </Typography>
      {messageState.fetchState !== 'ok' ? <Loading /> :
        <List id={"scroll-area"}>
          <MessageWrapper>
            {messageState.messages.length === 0 ? (
              <ListItemText sx={{ pt: 4 }}>
                <h3>トークしている人はいません。</h3>
              </ListItemText>
            ) : (
              messageState.messages.map((message, index) =>
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
