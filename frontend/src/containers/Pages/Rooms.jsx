import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchRooms } from "../../apis/users";

export const Rooms = (props) => {
  const userId = props.match.params.id
  const history = useHistory
  const [rooms, setRooms] = useState([])
  // メッセージルーム一覧を取得する
  useEffect(() => {
    fetchRooms({ userId: userId })
      .then(data => setRooms(data.rooms))
    return () => setRooms([])
  }, [])

  return (
    <>
      <h2>メッセージルーム</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          rooms.map(room =>
            <ListItem
              button
              divider
              key={room.id}
              onClick={() => history.push(room.id)}
            >
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 60 }} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary='メッセージルームの最後の投稿を記載する'
              />
            </ListItem >
          )
        }
      </List>
    </>
  )
}
