import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// styled
import { Grid } from "@mui/material";
// api
import { fetchUser } from "../apis/users";
// コンポーネント
import { SideProfile } from "../components/Users/SideProfile";
import { MyProfile } from "../components/Users/MyProfile";
import { Microposts } from "../components/Users/Microposts";
import { Following } from "../components/Users/Following";
import { Followers } from "../components/Users/Followers";
import { AvatarButton } from "../components/Navigations/AvatarButton";

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
        {/* <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.100' }}>
          <SideProfile
            dataFetching={() => setIsFetching(true)}
            loginUser={props.loginUser}
            isLoggedIn={props.isLoggedIn}
            user={user}
            microposts={microposts}
            following={following}
            followers={followers}
          />
        </Grid> */}
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

            {/* <Route path={`${props.match.url}/microposts`}>
              <Microposts
                dataFetching={() => setIsFetching(true)}
                loginUser={props.loginUser}
                microposts={microposts}
                userId={user.id}
              />
            </Route> */}


            {/* <Route exact path={`${props.match.url}/following`}>
              <Following
                dataFetching={() => setIsFetching(true)}
                following={following}
                userId={user.id}
              />
            </Route> */}

            <Route exact path={`${props.match.url}/followers`}>
              <Followers
                dataFetching={() => setIsFetching(true)}
                followers={followers}
                userId={user.id}
              />
            </Route>
          </Switch>

        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
