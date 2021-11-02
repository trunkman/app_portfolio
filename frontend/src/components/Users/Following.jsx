import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styled
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchFollowing } from "../../apis/users";

export const Following = (props) => {
  const userId = props.match.params.id
  const [following, setFollowing] = useState([])
  // 投稿一覧を取得する
  useEffect(() => {
    fetchFollowing({ userId: userId })
      .then(data => setFollowing(data.users))
    return () => setFollowing([])
  }, [])

  const history = useHistory()
  const PageTransition = (followingUserId) => {
    history.push(`/users/${followingUserId}`)
    props.dataFetching()
  }

  return (
    <>
      <h2>フォロー中</h2>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          following.map(user =>
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
