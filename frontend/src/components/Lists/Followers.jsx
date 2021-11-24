import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styled
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchFollowers } from "../../apis/users";
// コンポーネント
import { RoomButton } from "../Buttons/RoomButton";
import { FollowButton } from "../Buttons/FollowButton";

export const Followers = (props) => {
  const userId = props.userId
  const history = useHistory()
  const [followers, setFollowers] = useState([])
  const [followingIds, setFollowingIds] = useState([])

  const PageTransition = (followersUserId) => {
    history.push(`/users/${followersUserId}`)
  }

  // 投稿一覧を取得する
  useEffect(() => {
    fetchFollowers(userId)
      .then(data => {
        setFollowers(data.users)
        setFollowingIds(data.following_ids)
      })
    return () => setFollowers([])
  }, [])

  return (
    <>
      <h2>フォロワー</h2>
      <List>
        {
          followers.map(user =>
            <Box sx={{
              my: 2,
              border: 0.1,
              borderRadius: '8px',
            }}>
              <ListItem
                button
                key={user.id}
                onClick={() => PageTransition(user.id)}
              >
                <ListItemAvatar>
                  <AccountCircle sx={{ fontSize: 60 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary='Followers:ユーザーのプロフィール内容が記載されます。とりあえず仮テキストを入力しています。'
                />
              </ListItem>
              <RoomButton
                userId={user.id}
              />
              <FollowButton
                userId={user.id}
                followingIds={followingIds}
              />
            </Box>
          )
        }
      </List>
    </>
  )
}
