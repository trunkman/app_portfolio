import React, { useState, useEffect, Fragment } from "react";
import Link from '@mui/material/Link';
// styled
import { ListItemAvatar, Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { fetchUser } from "../apis/users";
import { deleteMicropost } from "../apis/microposts";
// コンポーネント

export const Microposts = (props) => {
  const [microposts, setMicroposts] = useState([])
  // 投稿一覧を更新する。※未完成
  useEffect(() => {
    fetchUser({ user_id: props.urlUserId })
      .then(data => {
        setMicroposts(data.microposts)
      })
  }, [])

  // 返り値：投稿内容の一覧
  return (
    <Fragment>
      <h2>投稿一覧</h2>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          microposts.map(micropost =>
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
                  <Link component="div" onClick={() => deleteMicropost(micropost.id)}>
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
    </Fragment>
  )
}
