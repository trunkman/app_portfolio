import React, { Fragment } from "react";
import Link from '@mui/material/Link';
// styled
import { ListItemAvatar, Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../apis/microposts";
// コンポーネント

export const Microposts = (props) => {
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
      .then(props.dataFetching())
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}
