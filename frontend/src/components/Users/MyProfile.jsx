import React, { useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
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
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item sx={{ bgcolor: 'grey.200' }}>
          <Avatar sx={{ width: 50, height: 50, p: 4 }} >
            <AccountCircle sx={{ fontSize: 50 }} />
          </Avatar>
        </Grid>

        <Grid item sx={{ bgcolor: 'grey.300' }}>
          <Typography variant="h5">
            {props.user.name}
          </Typography>
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
        </Grid>

        <Grid item sx={{ bgcolor: 'grey.200' }}>
          <Typography variant="body1">
            プロフィールを追加予定。ここにプロフィールが追加されます。ユーザーのプロフィールです。
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item>
          <ListItem
            component={Link}
            to={`/users/${props.user.id}/following`}
          >
            フォロー中
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem
            component={Link}
            to={`/users/${props.user.id}/followers`}
          >
            フォロワー
          </ListItem>
        </Grid>
      </Grid>

      <Grid container sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'grey.300' }}>
        <Grid item>
          <Skeleton variant="rect" width={75} height={100} />
        </Grid>
        <Grid item>
          <Typography variant="body1">お気に入りの本</Typography>
          <Typography variant="h6">本のタイトル</Typography>
        </Grid>
      </Grid>
    </>
  )
}
