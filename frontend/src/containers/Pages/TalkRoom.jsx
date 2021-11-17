import React, { useState, useEffect, useReducer } from "react";
// styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// api
import { fetchMessages } from "../../apis/rooms"
// reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
// Presentational Cpmponent
import { Chat } from "../../components/Forms/Chat";
import { Message } from "../../components/Lists/Message";

const useStyles = makeStyles(() =>
  createStyles({
    "messages": {
      height: "400px",
      padding: "0",
      overflow: "auto"
    }
  }),
);

export const TalkRoom = (props) => {
  const classes = useStyles();
  const roomId = props.match.params.id
  const [messages, setMessages] = useState([])
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState)

  // ルームのメッセージ一覧を取得する
  useEffect(() => {
    fetchMessages({ roomId: roomId })
      .then(data => {
        setMessages(data.messages)
        dataDispatch({ type: 'complete' })
      })
    return () => setMessages([])
  }, [dataState.messages])

  return (
    <>
      <h3>{props.loginUser.name}</h3>
      <List className={classes.messages} id={"scroll-area"}>
        {messages.length === 0 ? (
          <ListItemText>
            メッセージはありません。
          </ListItemText>
        ) : (
          messages.map((message, index) =>
            <Message
              text={message.content}
              key={index}
              roomId={roomId}
              loginUserId={props.loginUser.id}
            />
          )
        )
        }
      </List>
      <p>
        トークを入力する箇所
      </p>
      <Chat
        user_id={props.loginUser.id}
        room_id={roomId}
        dataFetch={() => dataDispatch({ type: 'messages' })}
      />
    </>
  )
}
