import React from "react"
import { useHistory } from "react-router-dom";
// Style
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
// Component
import { SettingDialog } from "../Dialogs/SettingDialog";
import { FollowButton } from "../Buttons/FollowButton";
// import { ImageButton } from "../Buttons/ImageButton";
import { ProfileImageButton } from "../Buttons/ProfileImageButton";

const useStyles = makeStyles(() =>
  createStyles({
    'button': {
      background: '#0288d1',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 30,
      padding: '15px 20px',
    }
  }),
);

export const UserInfo = ({
  loginUser,
  open,
  profileState,
  setOpen,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        pb: 5,
      }}>
        <ProfileImageButton />
        <Box sx={{ pl: 3 }}>
          <Typography variant="h4">
            <Box sx={{ letterSpacing: 6 }}>{profileState.user.name}</Box>
          </Typography>
          <Box sx={{ letterSpacing: 3, pt: 2 }}>{profileState.user.profile}</Box>
          <Typography variant="h6">
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/diaries`)}
              sx={{ letterSpacing: 4, pt: 2 }}
            >
              目標睡眠時間：<b>{profileState.user.ideal_sleeping_hours}</b> 時間
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
              読了：<b>{profileState.subscriptions.length}</b> 冊
            </Box>
            <Box
              onClick={() => history.push(`/users/${profileState.user.id}/books`)}
              sx={{ letterSpacing: 2, mr: 2, cursor: 'pointer' }}
            >
              積読：<b>{profileState.subscriptions.length}</b> 冊
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            {
              loginUser.id === profileState.user.id ? (
                <>
                  <Button
                    component='div'
                    className={classes.button}
                    onClick={() => { setOpen(true) }}
                  >
                    プロフィール編集
                  </Button>
                  {/* <ImageButton /> */}
                </>
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
