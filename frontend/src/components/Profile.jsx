import React, { Fragment, useState } from "react";
// style
import { Avatar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
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
  // 返り値：ユーザー画面
  return (
    <Fragment>
      <h2>プロフィール</h2>
      <Avatar sx={{ width: 56, height: 56 }} >
        <AccountCircle sx={{ fontSize: 65 }} />
      </Avatar>
      <Typography variant="h6">
        {props.loginUser.name}
      </Typography>
      <Typography variant="body1">
        プロフィールを追加予定
      </Typography>
      {
        props.isLoggedIn &&
        <Fragment>
          <div>
            <Button onClick={handleOpenSetting}>
              プロフィールの編集
            </Button>
            <SettingDialog
              handleClose={handleCloseSetting}
              open={openSettingDialog}
              user={props.loginUser}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleOpenPost}>
              投稿
            </Button>
          </div>
        </Fragment>
      }
      <MicropostDialog
        handleClose={handleClosePost}
        open={openDialogPost}
        user={props.loginUser}
      />
    </Fragment >
  )
}
