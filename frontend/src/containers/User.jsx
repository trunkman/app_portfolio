import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styled
import { Grid } from "@mui/material";
// api
import { fetchUser } from "../apis/users";
// コンポーネント
import { SideProfile } from "../components/SideProfile";
import { MyProfile } from "../components/MyProfile";
import { Microposts } from "../components/Microposts";
import { Following } from "../components/Following";
import { Followers } from "../components/Followers";

export const User = (props) => {
  const [user, setUser] = useState('No Name')
  const [microposts, setMicroposts] = useState([])
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  // ユーザー情報の取得
  useEffect(() => {
    fetchUser({ userId: props.match.params.id })
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
        <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.100' }}>
          <SideProfile
            dataFetching={() => setIsFetching(true)}
            loginUser={props.loginUser}
            isLoggedIn={props.isLoggedIn}
            user={user}
            microposts={microposts}
            following={following}
            followers={followers}
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.100' }}>

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
              />            </Route>
          </Switch>

          <Switch>
            <Route exact path={`${props.match.url}/microposts`}>
              <Microposts
                dataFetching={() => setIsFetching(true)}
                loginUser={props.loginUser}
                microposts={microposts}
              />
            </Route>
          </Switch>

          <Switch>
            <Route exact path={`${props.match.url}/following`}>
              <Following
                dataFetching={() => setIsFetching(true)}
                following={following}
              />
            </Route>
          </Switch>

          <Switch>
            <Route exact path={`${props.match.url}/followers`}>
              <Followers
                dataFetching={() => setIsFetching(true)}
                followers={followers}
              />
            </Route>
          </Switch>

        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
