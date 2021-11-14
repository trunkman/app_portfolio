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

export const MyProfile = (props) => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  // 設定変更Dialogを開閉する関数群
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }

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
              99フォロー中
            </ListItem>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/followers`}
            >
              99フォロワー
            </ListItem>
          </Grid>
        </Grid>
        {
          (props.loginUser.id === props.user.id) &&
          <>
            <Button onClick={handleOpenSetting}>
              プロフィール編集
            </Button>
            <SettingDialog
              handleClose={handleCloseSetting}
              open={openSettingDialog}
              user={props.loginUser}
              dataFetching={props.dataFetching}
            />
          </>
        }
        <Typography variant="body1">お気に入りの本</Typography>
        <Typography variant="h6">本のタイトル</Typography>
        <Skeleton variant="rect" width={75} height={100} />
      </Box>





    </>
  )
}
