import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styled
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';

// api
import { fetchUser } from "../../apis/users";
// コンポーネント
import { MyProfile } from "../../components/Users/MyProfile";
import { Followers } from "../../components/Users/Followers";
import { AvatarButton } from "../../components/Navigations/AvatarButton";
import { Calendar } from "../../components/Diaries/Calendar";
import { Microposts } from "./Microposts";


export const Profile = (props) => {
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: 0.2,
      p: 2,
      maxWidth: 800,
    }}>
      <MyProfile
        dataFetching={() => setIsFetching(true)}
        loginUser={props.loginUser}
        isLoggedIn={props.isLoggedIn}
        user={user}
      />
      <Microposts
        userId={userId}
        loginUser={props.loginUser}
      />
    </Box>
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
