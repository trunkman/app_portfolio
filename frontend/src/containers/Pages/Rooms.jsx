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
  const [entries, setEntries] = useState([])
  // メッセージルームの一覧を取得する
  useEffect(() => {
    fetchRooms({ userId: props.loginUser.id })
      .then(data => setEntries(data.entries))
    return () => setEntries([])
  }, [])

  return (
    <>
      <h2>トークルーム</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          true
            ? (<p> トークしている人はいません </p>
            ) : (
              entries.map(entry => {
                <ListItem
                  button
                  divider
                  key={entry.id}
                  onClick={() => history.push(`/rooms/${entry.room_id}`)}
                >
                  <ListItemAvatar>
                    <AccountCircle sx={{ fontSize: 60 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={entry.user_id}
                    secondary='メッセージルームの最後の投稿を記載する予定'
                  />
                  <p>
                    ルームを削除する
                  </p>
                </ListItem >
              })
            )
        }
      </List>
    </>
  )
}
