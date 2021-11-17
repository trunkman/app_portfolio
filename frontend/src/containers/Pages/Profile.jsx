import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// Style
import Box from '@mui/material/Box';
// Api
import { fetchUser } from "../../apis/users";
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
// Component
import { UserProfile } from "../../components/UserInfomation/UserProfile";
import { Timeline } from "./Timeline";


export const Profile = (props) => {
  const userId = props.match.params.id
  const [user, setUser] = useState('No Name')
  const [followingIds, setFollowingIds] = useState([])
  const [followersIds, setFollowersIds] = useState([])
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState)
  // ユーザー情報の取得
  useEffect(() => {
    fetchUser({ userId: userId })
      .then(data => {
        setUser(data.user)
        setFollowingIds(data.following_ids)
        setFollowersIds(data.followers_ids)
        dataDispatch({ type: 'complete' })
      })
    return () => {
      setUser([])
    }
  }, [dataState.user])

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
      <UserProfile
        dataUserFetch={() => dataDispatch({ type: 'user' })}
        loginUser={props.loginUser}
        isLoggedIn={props.isLoggedIn}
        user={user}
        followingIds={followingIds}
        followersIds={followersIds}
      />
      <Timeline
        userId={userId}
        loginUser={props.loginUser}
      />
    </Box>
  )
}
