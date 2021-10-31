import React from "react";
import { useHistory } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";

export const Following = (props) => {
  const history = useHistory()
  const PageTransition = (userId) => {
    history.push(`/users/${userId}`)
    props.dataFetching()
  }

  return (
    <>
      <h2>フォロー中</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          props.following.map(user =>
            <ListItem
              button
              divider
              key={user.id}
              onClick={() => PageTransition(user.id)}
            >
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 60 }} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary='Following:ユーザーのプロフィール内容が記載されます。とりあえず仮テキストを入力しています。'
              />
            </ListItem >
          )
        }
      </List>
    </>
  )
}
