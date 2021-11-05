import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchRooms } from "../../apis/users";

export const Rooms = (props) => {
  const history = useHistory()
  const [rooms, setRooms] = useState([])
  // メッセージルームの一覧を取得する
  useEffect(() => {
    fetchRooms({ userId: props.loginUser.id })
      .then(data => setRooms(data.rooms))
    return () => setRooms([])
  }, [])

  return (
    <>
      <h2>トークルーム</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          rooms.map(room =>
            <ListItem
              button
              divider
              key={room.id}
              onClick={() => history.push(`/rooms/${room.id}`)}
            >
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 60 }} />
              </ListItemAvatar>
              <ListItemText
                primary={room.id}
                secondary='メッセージルームの最後の投稿を記載する予定'
              />
              <p>
                メッセージルーム削除する
              </p>
            </ListItem >
          )
        }
      </List>
    </>
  )
}
