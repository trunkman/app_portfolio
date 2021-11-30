import React, { useState } from "react"
import { useHistory } from "react-router-dom";
// Style
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
// Icon
import AccountCircle from "@mui/icons-material/AccountCircle";
// Component
import { SettingDialog } from "../Dialogs/SettingDialog";
import { FollowButton } from "../Buttons/FollowButton";

const useStyles = makeStyles(() => ({
  button: {
    background: '#0059b2',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 30,
    padding: '15px 20px',
  },
}));

export const UserInfo = ({
  loginUser,
  profileState,
}) => {
  const history = useHistory();
  const classes = useStyles();
  // 設定ダイアログの開閉
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        pb: 5,
      }}>
        <Avatar sx={{
          alignItems: 'center',
          width: 150, height: 150,
          p: 4,
        }} >
          <AccountCircle sx={{ fontSize: 150 }} />
        </Avatar>
        <Box sx={{ pl: 3 }}>
          <Typography variant="h4">
            <Box sx={{ letterSpacing: 6 }}>{profileState.user.name}</Box>
          </Typography>
          <Box sx={{ letterSpacing: 3, pt: 2 }}>{profileState.user.profile}</Box>
          <Typography variant="h6">
            <Box sx={{ letterSpacing: 4, pt: 2 }}>
              ★ 目標睡眠時間：<b>{profileState.user.ideal_sleeping_hours}</b> 時間
            </Box>
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 2,
          }}>
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/following`)}
              sx={{ letterSpacing: 2, mr: 2, cursor: 'pointer' }}
            >
              <b>{profileState.followingIds.length}</b> フォロー中
            </Box>
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/followers`)}
              sx={{ letterSpacing: 2, mr: 2, cursor: 'pointer' }}
            >
              <b>{profileState.followersIds.length}</b> フォロワー
            </Box>
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/books`)}
              sx={{ letterSpacing: 2, mr: 2, cursor: 'pointer' }}
            >
              読了：<b>{profileState.subscriptions.length}</b>本
            </Box>
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/books`)}
              sx={{ letterSpacing: 2, mr: 2, cursor: 'pointer' }}
            >
              積読：<b>{profileState.subscriptions.length}</b>本
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            {
              (loginUser.id === profileState.user.id) ? (
                <Button
                  component='div'
                  className={classes.button}
                  onClick={() => { setOpen(true) }}
                >
                  プロフィール編集
                </Button>
              ) : (
                <FollowButton
                  userId={profileState.user.id}
                  followStatus={profileState.followStatus}
                />
              )
            }
          </Box>
        </Box>
      </Box>

      <SettingDialog
        dataUserFetch={profileState.dataUserFetch}
        handleClose={() => { setOpen(false) }}
        open={open}
      />
    </>
  )
}
