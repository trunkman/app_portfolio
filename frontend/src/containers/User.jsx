import React, { useState, useEffect } from "react";
// styled
import { Grid } from "@mui/material";
// api
import { fetchUser } from "../apis/users";
// コンポーネント
import { Profile } from "../components/Profile";
import { Microposts } from "../components/Microposts";

export const User = (props) => {
  const [user, setUser] = useState([])
  const [microposts, setMicroposts] = useState([])
  // ユーザー情報の取得 ※未完：micropost登録・削除で更新しない
  useEffect(() => {
    fetchUser({ user_id: props.match.params.id })
      .then(data => {
        setUser(data.user)
        setMicroposts(data.microposts)
      })
  }, [])

  return (
    <Grid container sx={{ width: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <Profile
          loginUser={props.loginUser}
          isLoggedIn={props.isLoggedIn}
          user={user}
        />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <Microposts
          loginUser={props.loginUser}
          microposts={microposts}
          user={user}
        />
      </Grid>
    </Grid>
  )
}
