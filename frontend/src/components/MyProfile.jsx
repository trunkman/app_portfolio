import React, { useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import Skeleton from '@material-ui/lab/Skeleton';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// コンポーネント
import { SettingDialog } from "./Dialogs/SettingDialog";

export const MyProfile = (props) => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  // 設定変更Dialogを開閉する関数群
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }

  return (
    <>
      <h2>マイプロフィール</h2>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <Avatar sx={{ width: 100, height: 100, p: 4 }} >
          <AccountCircle sx={{ fontSize: 100 }} />
        </Avatar>
        <Typography variant="h3">
          {props.user.name}
        </Typography>
        <Typography variant="h5">
          props.user.profile.プロフィールを追加予定。ここにプロフィールが追加されます。ユーザーのプロフィールです。
          ユーザーの自己紹介となります。趣味などが記載されます。
        </Typography>
        {
          (props.loginUser.id === props.user.id) &&
          <>
            <Button onClick={handleOpenSetting}>
              プロフィールの編集
            </Button>
            <SettingDialog
              handleClose={handleCloseSetting}
              open={openSettingDialog}
              user={props.loginUser}
              dataFetching={props.dataFetching}
            />
          </>
        }

        <Grid container spacing={2}>
          <Grid item sm={4}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/following`}
            >
              {props.following.length} フォロー中
            </ListItem>
          </Grid>
          <Grid item sm={4}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/followers`}
            >
              {props.followers.length} フォロワー
            </ListItem>
          </Grid>
          <Grid item sm={4}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/microposts`}
            >
              {props.microposts.length} つぶやき
            </ListItem>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h5">
              お気に入りの本
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">
              props.user.book_first
              <Skeleton variant="rect" width={75} height={100} />
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">
              props.user.book_second
              <Skeleton variant="rect" width={75} height={100} />
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h6">
              props.user.book_third
              <Skeleton variant="rect" width={75} height={100} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
