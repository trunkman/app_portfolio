import React from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// api
import { deleteMicropost } from "../../apis/microposts";
// コンポーネント
import { LikeButton } from "../../components/Buttons/LikeButton";
import { CommentButton } from "../../components/Buttons/CommentButton"

export const Micropost = (props) => {
  const deleteSubmit = (micropostId) => {
    deleteMicropost(micropostId)
  }

  return (
    <Box sx={{ my: 4 }}>
      <Grid container>
        <Grid item xs={2}>
          <ListItemAvatar>
            <AccountCircle />
          </ListItemAvatar>
          {props.loginUserId === props.micropost.user_id && (
            <Link
              component="div"
              onClick={() => deleteSubmit(props.micropost.id)}
            >
              削除
            </Link>
          )}
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Typography>
              <b>{props.micropost.id}</b>  {props.micropost.created_at}
            </Typography>
            <Typography>

            </Typography>
          </Box>
          <Box>
            <Typography>
              {props.micropost.content}
            </Typography>
          </Box>
          <Box>
            <LikeButton
              loginUserId={props.loginUserId}
              micropostId={props.micropost.id}
              likedStatus={props.likedStatus}
            />
            <CommentButton
              loginUserId={props.loginUserId}
              micropostId={props.micropost.id}
            />
          </Box>
        </Grid>
      </Grid>
    </Box >
  )
}
