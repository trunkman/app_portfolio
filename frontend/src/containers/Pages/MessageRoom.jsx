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
      maxWidth: 600,
      textAlign: 'center',
      width: '100%',
    },
    'title': {
      backgroundColor: '#001e3c',
      top: 0,
      paddingTop: 80,
      position: 'fixed',
      width: 600,
      zIndex: 1,
    },
    'messages': {
      display: 'flex',
      flexDirection: 'column-reverse',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      overflow: "auto",
      marginBottom: 150,
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
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        <Box sx={{ letterSpacing: 10, pb: 2 }}>
          <b>{messageState.user.name}</b>
        </Box>
      </Typography>

      {messageState.fetchState !== 'ok' ? <Loading /> :
        <List className={classes.messages} id={"scroll-area"}>
          {messageState.messages.length === 0 ? (
            <ListItemText>
              メッセージはありません。
            </ListItemText>
          ) : (
            messageState.messages.map((message, index) =>
              <Message
                message={message}
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
