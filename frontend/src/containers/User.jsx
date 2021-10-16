import React, { Fragment, useState } from "react";
// ユーザーページのstyle
import Button from '@mui/material/Button';
// コンポーネント
import { SettingDialog } from "../components/SettingDialog";

export const User = (props) => {
  // 設定変更Dialogを開閉する関数(ログイン)
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }

  // 返り値：ユーザー画面
  return (
    <Fragment>

      <h1>ユーザーページ</h1>
      <p>Idは{props.user.id}です</p>
      <p>名前は{props.user.name}です</p>
      <p>Emailは{props.user.email}です</p>
      {
        props.isLoggedIn &&
        <Button
          variant="outlined"
          onClick={handleOpenSetting}
        >
          設定（ユーザー情報の更新）
          <SettingDialog
            open={openSettingDialog}
            handleClose={handleCloseSetting}
            user={props.user}
          />
        </Button>

      }
    </Fragment>
  )
}
