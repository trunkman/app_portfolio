import React, { useEffect, useReducer } from "react";
// Style
import { styled } from '@mui/system';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// Api
import { fetchMessages } from "../../apis/rooms"
import { deleteMessage } from "../../apis/messages"
// Reducer
import { messageInitialState, messageReducer } from '../../reducer/MessageReducer';
// Cpmponent
import { Chat } from "../../components/Forms/Chat";
import { MessageList } from "../Lists/MessageList";
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

  // メッセージを削除する
  const messageDelete = (messageId) => {
    deleteMessage(messageId)
      .then(() => {
        messageDispatch({ type: 'fetching' })
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
      {messageState.fetchState !== 'ok' && <Loading />}

      {messageState.fetchState === 'ok' &&
        <List sx={{ width: '100%' }}>
          <MessageList
            messageState={messageState}
            messageDelete={messageDelete}
            loginUser={loginUser}
          />
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
