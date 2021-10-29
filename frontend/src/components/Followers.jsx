import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import { fetchFollowers } from "../apis/users";

export const Followers = (props) => {
  // const [followers, setFollowers] = useState([])
  // const [title, setTitle] = useState(null)
  // ユーザーのFollowers情報を取得
  // useEffect(() => {
  //   fetchFollowers({ userId: props.userId })
  //     .then(data => {
  //       // setFollowers(data.users)
  //       setTitle(data.title)
  //     })
  // }, [])

  return (
    <Fragment>
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
    </Fragment>
  )
}
