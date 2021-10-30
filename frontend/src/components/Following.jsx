import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// import { fetchFollowing } from "../apis/users";

export const Following = (props) => {
  // const [following, setFollowing] = useState([])
  // const [title, setTitle] = useState(null)
  // // ユーザーのFollowing情報を取得
  // useEffect(() => {
  //   fetchFollowing({ userId: props.userId })
  //     .then(data => {
  //       setFollowing(data.users)
  //       setTitle(data.title)
  //     })
  // }, [])

  return (
    <Fragment>
      <h2>フォロー中</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          props.following.map(user =>
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
                secondary='Following:ユーザーのプロフィール内容が記載されます。とりあえず仮テキストを入力しています。'
              />
            </ListItem >
          )
        }
      </List>
    </Fragment>
  )
}
