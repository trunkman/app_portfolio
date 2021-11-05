import React, { useState, useEffect } from "react";
// styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
// api
import { fetchMessages } from "../../apis/rooms"
// コンテイナー
import { Message } from "../../components/Messages/Message";

const useStyles = makeStyles(() =>
  createStyles({
    "messages": {
      height: "400px",
      padding: "0",
      overflow: "auto"
    }
  }),
);

export const MessageRoom = (props) => {
  const roomId = props.match.params.id
  const classes = useStyles();
  const [messages, setMessages] = useState([])
  // ルームのメッセージ一覧を取得する
  useEffect(() => {
    fetchMessages({ roomId: roomId })
      .then(data => setMessages(data.messages))
    return () => setMessages([])
  }, [])

  return (
    <>
      <h3>{props.loginUser.name}</h3>
      <List className={classes.messages} id={"scroll-area"}>
        {
          true
            ? (<p> メッセージがありません </p>
            ) : (messages.map((message, index) => {
              <Message
                text={message.content}
                key={index}
                roomId={roomId}
                loginUserId={props.loginUser.id}
              />
            })
            )
        }
      </List>
    </>
  )
}
