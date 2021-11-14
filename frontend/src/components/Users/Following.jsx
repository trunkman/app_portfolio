import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styled
import { Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchFollowing } from "../../apis/users";
// コンポーネント
import { RoomButton } from "../Buttons/RoomButton";


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
      <Typography
        variant="h4"
        sx={{ py: 2 }}
      >
        フォロー中
      </Typography>
      <List sx={{ bgcolor: 'background.paper' }}>
        {
          following.map(user =>
            <div>
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
                <RoomButton
                  userId={user.id}
                />
              </ListItem>
            </div>
          )
        }
      </List>
    </>
  )
}
