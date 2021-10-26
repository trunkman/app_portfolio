import React, { Fragment, useState, useEffect } from "react";
import Link from '@mui/material/Link';
// ユーザーページのstyle
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { ListItem } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
// api
import { fetchUser } from "../apis/users";
import { deleteMicropost } from "../apis/microposts";
// コンポーネント
import { SettingDialog } from "../components/SettingDialog";
import { MicropostDialog } from "../components/MicropostDialog";

export const User = (props) => {
  const [openSettingDialog, setOpenSettingDialog] = useState(false)
  const [openDialogPost, setOpenDialogPost] = useState(false)
  const [microposts, setMicroposts] = useState([])
  // 設定変更Dialogを開閉する関数
  const handleOpenSetting = () => { setOpenSettingDialog(true) }
  const handleCloseSetting = () => { setOpenSettingDialog(false) }
  // 投稿Dialogを開閉する関数
  const handleOpenPost = () => { setOpenDialogPost(true) }
  const handleClosePost = () => { setOpenDialogPost(false) }
  // 投稿一覧の画面
  const MicropostsList = microposts.map(micropost =>
    <ListItem key={micropost.id}>
      <ListItemText
        primary={micropost.content}
        secondary={micropost.created_at}
      />
      {
        props.user.id === micropost.user_id &&
        <Link component="button" onClick={() => deleteMicropost(micropost.id)}>delete</Link>
      }
    </ListItem >
  )

  // レンダーされた際に投稿内容を描画する。更新はまだしない
  useEffect(() => {
    fetchUser({ user_id: props.user.id })
      .then(data => {
        setMicroposts(data.microposts)
      })
    return setMicroposts([])
  }, [])

  // 返り値：ユーザー画面
  return (
    <Fragment>
      <h1>My Profile</h1>
      <div className="my_profile">
        <p>ID:{props.user.id}</p>
        <p>名前:{props.user.name}</p>
        <p>※プロフィールの追加</p>
        <p>※画像の追加</p>
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
      </div>
      <Button variant="outlined" onClick={handleOpenPost}>
        投稿
      </Button>
      <MicropostDialog
        handleClose={handleClosePost}
        open={openDialogPost}
        user={props.user}
      />
      <div>
        <h2>投稿一覧</h2>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {MicropostsList}
        </List>
      </div>

    </Fragment>
  )
}
