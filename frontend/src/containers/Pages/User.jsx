import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styled
import { Grid, Typography } from "@mui/material";
// api
import { fetchUser } from "../../apis/users";
// コンポーネント
import { MyProfile } from "../../components/Users/MyProfile";
import { Followers } from "../../components/Users/Followers";
import { AvatarButton } from "../../components/Navigations/AvatarButton";
import { Calendar } from "../../components/Diaries/Calendar";
import { Microposts } from "./Microposts";


export const User = (props) => {
  const userId = props.match.params.id
  const [user, setUser] = useState('No Name')
  const [microposts, setMicroposts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  // ユーザー情報の取得
  useEffect(() => {
    fetchUser({ userId: userId })
      .then(data => {
        setUser(data.user)
        setIsFetching(false)
      })
    return () => {
      setUser([])
    }
  }, [isFetching])

  return (
    <Grid container sx={{ bgcolor: 'grey.500' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <Typography variant="h3">Plofile</Typography>
      </Grid>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <MyProfile
          dataFetching={() => setIsFetching(true)}
          loginUser={props.loginUser}
          isLoggedIn={props.isLoggedIn}
          user={user}
        />
      </Grid>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <Calendar
          userId={userId}
        />
      </Grid>
      <Grid item sx={{ display: 'flex', justifyContent: 'center', px: 2, bgcolor: 'grey.400' }}>
        <Microposts
          userId={userId}
          loginUser={props.loginUser}
        />
      </Grid>

    </Grid>
  )
}

{/* <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.200' }}>
  <AvatarButton user={user} size="45" />
  <MyProfile
    dataFetching={() => setIsFetching(true)}
    loginUser={props.loginUser}
    isLoggedIn={props.isLoggedIn}
    user={user}
    microposts={microposts}
    following={following}
    followers={followers}
  />
</Grid> */}
