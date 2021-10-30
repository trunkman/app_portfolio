import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// コンポーネント
import { SettingDialog } from "./Dialogs/SettingDialog";
import { MicropostDialog } from "./Dialogs/MicropostDialog";

export const Profile = (props) => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  const [openDialogPost, setOpenDialogPost] = useState(false)
  // 設定変更Dialogを開閉する関数群
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }
  // 投稿Dialogを開閉する関数群
  const handleOpenPost = () => { setOpenDialogPost(true) }
  const handleClosePost = () => { setOpenDialogPost(false) }

  return (
    <Fragment>
      <h2>プロフィール</h2>
      <Avatar sx={{ width: 56, height: 56 }} >
        <AccountCircle sx={{ fontSize: 65 }} />
      </Avatar>
      <Typography variant="h6">
        {props.user.name}
      </Typography>
      <Typography variant="body1">
        プロフィールを追加予定。ここにプロフィールが追加されます。ユーザーのプロフィールです。
        ユーザーの自己紹介となります。趣味などが記載されます。
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <ListItem
            component={Link}
            to={`/users/${props.user.id}/following`}>
            {props.following.length} フォロー中
          </ListItem>
        </Grid>
        <Grid item sm={6}>
          <ListItem
            component={Link}
            to={`/users/${props.user.id}/followers`}>
            {props.followers.length}
            フォロワー
          </ListItem>
        </Grid>
      </Grid>
      {
        (props.loginUser.id === props.user.id) &&
        <Fragment>
          <div>
            <Button onClick={handleOpenSetting}>
              プロフィールの編集
            </Button>
            <SettingDialog
              handleClose={handleCloseSetting}
              open={openSettingDialog}
              user={props.loginUser}
              dataFetching={props.dataFetching}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleOpenPost}>
              投稿
            </Button>
          </div>
          <MicropostDialog
            handleClose={handleClosePost}
            open={openDialogPost}
            user={props.loginUser}
            dataFetching={props.dataFetching}
          />
        </Fragment>
      }
    </Fragment >
  )
}
