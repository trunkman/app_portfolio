import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styled
import { Grid } from "@mui/material";
// api
import { fetchUser } from "../../apis/users";
// コンポーネント
import { MyProfile } from "../../components/Users/MyProfile";
import { Followers } from "../../components/Users/Followers";
import { AvatarButton } from "../../components/Navigations/AvatarButton";
import { Calendar } from "../../components/Diaries/Calendar";


export const User = (props) => {
  const userId = props.match.params.id
  const [user, setUser] = useState('No Name')
  const [microposts, setMicroposts] = useState([])
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  // ユーザー情報の取得
  useEffect(() => {
    fetchUser({ userId: userId })
      .then(data => {
        setUser(data.user)
        setMicroposts(data.microposts)
        setFollowing(data.following)
        setFollowers(data.followers)
        setIsFetching(false)
      })
    return () => {
      setUser([])
      setMicroposts([])
      setFollowing([])
      setFollowers([])
    }
  }, [isFetching])

  return (
    <BrowserRouter>
      <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
        <AvatarButton user={user} size="45" />
        <Grid item xs={12} sm={12} sx={{ px: 2, bgcolor: 'grey.100' }}>
          <Switch>
            <Route exact path={`${props.match.url}`}>
              <MyProfile
                dataFetching={() => setIsFetching(true)}
                loginUser={props.loginUser}
                isLoggedIn={props.isLoggedIn}
                user={user}
                microposts={microposts}
                following={following}
                followers={followers}
              />
            </Route>

            <Route exact path={`${props.match.url}/followers`}>
              <Followers
                dataFetching={() => setIsFetching(true)}
                followers={followers}
                userId={user.id}
              />
            </Route>
          </Switch>

          <Calendar
            user={user}
          />

        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
