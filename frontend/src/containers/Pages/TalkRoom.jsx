import React, { useEffect, useReducer } from "react";
// styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// api
import { fetchMessages } from "../../apis/rooms"
// reducer
import { messageInitialState, messageReducer } from '../../reducer/MessageReducer';
// Cpmponent
import { Chat } from "../../components/Forms/Chat";
import { Message } from "../../components/Lists/Message";
import { Loading } from '../../components/Loading';


const useStyles = makeStyles(() =>
  createStyles({
    "messages": {
      height: "400px",
      padding: "0",
      overflow: "auto"
    }
  }),
);

export const TalkRoom = ({
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
        })
      })
  }

  useEffect(() => Messages(), [messageState.reRender])

  return (
    <>
      <h3>{loginUser.name}</h3>
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
          )
          }
        </List>
      }
      <p>
        トークを入力する箇所
      </p>
      <Chat
        user_id={loginUser.id}
        room_id={roomId}
        dataFetch={() => messageDispatch({ type: 'fetching' })}
      />
    </>
  )
}
