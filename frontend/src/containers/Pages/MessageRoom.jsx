import React, { useEffect, useReducer } from "react";
// Style
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// Api
import { fetchMessages } from "../../apis/rooms"
// Reducer
import { messageInitialState, messageReducer } from '../../reducer/MessageReducer';
// Cpmponent
import { Chat } from "../../components/Forms/Chat";
import { Message } from "../../components/Lists/Message";
import { Loading } from '../../components/Loading';

const useStyles = makeStyles(() =>
  createStyles({
    'root': {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 800,
      textAlign: 'center',
      width: '100%',
    },
    'messages': {
      display: 'flex',
      flexDirection: 'column-reverse',
      height: 390,
      width: 600,
      overflow: "auto",
      paddingTop: 0,
    }
  }),
);

export const MessageRoom = ({
  roomId,
  loginUser,
}) => {
  const classes = useStyles();
  const [messageState, messageDispatch] = useReducer(messageReducer, messageInitialState)
  // トークルームのメッセージ一覧を取得する
  const Messages = () => {
    fetchMessages(roomId)
      .then(data => {
        messageDispatch({
          type: 'fetchSuccess',
          payload: data.messages,
        });
      });
  }

  useEffect(() => Messages(), [messageState.reRender])

  return (
    <Box className={classes.root}>
      <Typography variant="h4">
        <Box sx={{ letterSpacing: 10, pb: 2 }}><b>相手ユーザー</b></Box>
      </Typography>

      {messageState.fetchState != 'ok' ? <Loading /> :
        <List className={classes.messages} id={"scroll-area"}>
          {messageState.messages.length === 0 ? (
            <ListItemText>
              メッセージはありません。
            </ListItemText>
          ) : (
            messageState.messages.map((message, index) =>
              <Message
                text={message.content}
                key={index}
                roomId={roomId}
                loginUserId={loginUser.id}
              />
            )
          )}
        </List>
      }
      <Chat
        user_id={loginUser.id}
        room_id={roomId}
        dataFetch={() => messageDispatch({ type: 'fetching' })}
      />
    </Box>
  )
}
