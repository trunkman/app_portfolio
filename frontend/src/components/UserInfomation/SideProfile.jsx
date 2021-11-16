import React, { useState } from "react"
import { Link } from "react-router-dom";
// style
import { Avatar, ListItem, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
// アイコン
import AccountCircle from "@mui/icons-material/AccountCircle";
import HotelIcon from '@mui/icons-material/Hotel';
// コンポーネント
import { MicropostDialog } from "../Dialogs/MicropostDialog";
import { FollowButton } from "../Buttons/FollowButton";

export const SideProfile = (props) => {
  const [openDialogPost, setOpenDialogPost] = useState(false)
  const [followStatus, setFollowStatus] = useState(false)
  // 投稿Dialogを開閉する関数群
  const handleOpenPost = () => { setOpenDialogPost(true) }
  const handleClosePost = () => { setOpenDialogPost(false) }

  // useEffect(() => {
  //   fetchFollow({ userId: props.user.id })
  //     .then(data => setFollowStatus(data))
  // }, [])

  return (
    <>
      <HotelIcon sx={{ fontSize: 40 }} />
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          component={Link}
          to={`/users/${props.user.id}`}
        >
          <AccountCircle sx={{ fontSize: 65 }} />
        </Avatar>
        <Typography variant="h6">
          {props.user.name}
        </Typography>
        <Typography variant="body1">
          props.user.profile.プロフィールを追加予定。ここにプロフィールが追加されます。ユーザーのプロフィールです。
          ユーザーの自己紹介となります。趣味などが記載されます。
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/following`}
            >
              {props.following.length} フォロー中
            </ListItem>
          </Grid>
          <Grid item sm={6}>
            <ListItem
              component={Link}
              to={`/users/${props.user.id}/followers`}
            >
              {props.followers.length} フォロワー
            </ListItem>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <ListItem
            component={Link}
            to={`/users/${props.user.id}/microposts`}
          >
            {props.microposts.length} つぶやき
          </ListItem>
        </Grid>
        {
          (props.loginUser.id === props.user.id)
            ? <>
              <Button variant="contained" onClick={handleOpenPost}>
                投稿
              </Button>
              <MicropostDialog
                handleClose={handleClosePost}
                open={openDialogPost}
                user={props.loginUser}
                dataFetching={props.dataFetching}
              />
            </>
            :
            <FollowButton
              followStatus={followStatus}
              handleFollow={() => { setFollowStatus() }}
              userId={props.userId}
            />
        }
      </Grid>
    </>
  )
}
