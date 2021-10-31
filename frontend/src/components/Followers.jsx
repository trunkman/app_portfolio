import React from "react";
import { Link } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";

export const Followers = (props) => {
  return (
    <>
      <h2>フォロワー</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          props.followers.map(user =>
            <ListItem
              button
              component={Link}
              divider
              key={user.id}
              to={`/users/${user.id}`}
            >
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 60 }} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary='Follower:ユーザーのプロフィール内容が記載されます。とりあえず仮テキストを入力しています。'
              />
            </ListItem >
          )
        }
      </List>
    </>
  )
}
