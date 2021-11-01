import React, { useState, useEffect } from "react";
import Link from '@mui/material/Link';
// styled
import { ListItemAvatar, Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../../apis/microposts";
import { fetchMicroposts } from "../../apis/users";
// コンポーネント

export const Microposts = (props) => {
  const userId = props.userId
  // const [microposts, setMicroposts] = useState([])
  // 投稿を削除する（管理者のみ実行可能）
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
      .then(props.dataFetching())
  }
  // 投稿一覧を取得する
  // useEffect(() => {
  //   fetchMicroposts(userId)
  //     .then(data => setMicroposts(data.microposts))
  // }, [])

  return (
    <>
      <h2>投稿一覧</h2>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          props.microposts.map(micropost =>
            <ListItem key={micropost.id}>
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 40 }} />
              </ListItemAvatar>
              <div>
                <ListItemText
                  component="div"
                  primary={micropost.id}
                  secondary={micropost.created_at}
                />
                {props.loginUser.id === micropost.user_id && (
                  <Link component="div" onClick={() => deleteSubmit(micropost.id)}>
                    delete
                  </Link>
                )}
              </div>
              <Typography variant="body1" pl={2}>
                {micropost.content}
              </Typography>
            </ListItem >
          )
        }
      </List>
    </>
  )
}
