import React, { useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
// コンポーネント
import { SettingDialog } from "../Dialogs/SettingDialog";
import { FollowButton } from "../Buttons/FollowButton";

export const UserInfo = ({
  loginUser,
  profile,
}) => {
  // 設定ダイアログの開閉
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: "flex-start",
        justifyContent: 'center',
      }}>
        <Avatar sx={{ width: 50, height: 50, p: 4 }} >
          <AccountCircle sx={{ fontSize: 100 }} />
        </Avatar>
        <Box
          flex-grow
          sx={{
            alignItems: "flex-start",
            pl: 3,
          }}
        >
          <Typography variant="h3">
            {profile.user.name}
          </Typography>
          <Typography variant="body1">
            {profile.user.profile}
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            component={Link}
            to={`/users/${profile.user.id}/following`}
          >
            <b>{profile.followingIds.length}</b> フォロー中
          </Button>
          <Button
            component={Link}
            to={`/users/${profile.user.id}/followers`}
          >
            <b>{profile.followersIds.length}</b> フォロワー
          </Button>
        </Box>
        <Box>
          {
            (loginUser.id === profile.user.id) ? (
              <Button onClick={() => { setOpen(true) }}>
                プロフィール編集
              </Button>
            ) : (
              <FollowButton
                userId={profile.user.id}
                followStatus={profile.followStatus}
              />
            )
          }
        </Box>
        <SettingDialog
          handleClose={() => { setOpen(false) }}
          open={open}
          dataUserFetch={profile.dataUserFetch}
        />
      </Box>
    </>
  )
}
