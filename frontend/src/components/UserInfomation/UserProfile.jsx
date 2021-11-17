import React, { useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@mui/material/Box';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// コンポーネント
import { SettingDialog } from "../Dialogs/SettingDialog";
import { FollowButton } from "../Buttons/FollowButton";

export const UserProfile = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Box>
        <Avatar sx={{ width: 100, height: 100, p: 4 }} >
          <AccountCircle sx={{ fontSize: 100 }} />
        </Avatar>
        <Typography variant="h5">
          {props.user.name}
        </Typography>
        <Typography variant="body1">
          プロフィールを追加予定。ここにプロフィールが追加されます。ユーザーのプロフィールです。
        </Typography>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/following`}
            >
              {props.followingIds.length} フォロー中
            </ListItem>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/followers`}
            >
              {props.followersIds.length} フォロワー
            </ListItem>
          </Grid>
        </Grid>
        {
          (props.loginUser.id === props.user.id) ? (
            <>
              <Button onClick={() => { setOpen(true) }}>
                プロフィール編集
              </Button>
              <SettingDialog
                handleClose={() => { setOpen(false) }}
                open={open}
                dataUserFetch={props.dataUserFetch}
              />
            </>
          ) : (
            <FollowButton
              userId={props.user.id}
              followingIds={props.followingIds}
            />
          )
        }
        <Typography variant="body1">お気に入りの本</Typography>
        <Typography variant="h6">本のタイトル</Typography>
        <Skeleton variant="rect" width={75} height={100} />
      </Box>





    </>
  )
}
