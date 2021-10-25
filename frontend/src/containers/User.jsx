import React, { Fragment, useState } from "react";
// ユーザーページのstyle
import Button from '@mui/material/Button';
// コンポーネント
import { SettingDialog } from "../components/SettingDialog";
import { MicropostDialog } from "../components/MicropostDialog";

export const User = (props) => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  const [openDialogPost, setOpenDialogPost] = useState(false)
  // 設定変更Dialogを開閉する関数
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }
  // 投稿Dialogを開閉する関数
  const handleOpenPost = () => { setOpenDialogPost(true) }
  const handleClosePost = () => { setOpenDialogPost(false) }

  // 返り値：ユーザー画面
  return (
    <Fragment>
      <h1>ユーザーページ</h1>
      <p>Idは{props.user.id}です</p>
      <p>名前は{props.user.name}です</p>
      <p>Emailは{props.user.email}です</p>
      {
        props.isLoggedIn &&
        <div>
          <Button variant="outlined" onClick={handleOpenSetting}>
            設定（ユーザー情報の更新）
          </Button>
          <SettingDialog
            handleClose={handleCloseSetting}
            open={openSettingDialog}
            user={props.user}
          />
        </div>
      }
      <Button variant="outlined" onClick={handleOpenPost}>
        投稿
      </Button>
      <MicropostDialog
        handleClose={handleClosePost}
        open={openDialogPost}
        user={props.user}
      />
      <div>
        <p>user.</p>
        <p>投稿時間</p>
        <p>投稿内容1</p>
        {/* 削除リンク */}
      </div>
      <div>
        <p>ユーザー名</p>
        <p>投稿時間</p>
        <p>投稿内容2</p>
        {/* 削除リンク */}
      </div>
    </Fragment>
  )
}
