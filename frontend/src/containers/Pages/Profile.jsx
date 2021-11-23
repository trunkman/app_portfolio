import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Api
import { fetchUser } from "../../apis/users";
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
import { profileInitialState, profileReducer } from '../../reducer/ProfileReducer';
// Component
import { UserProfile } from "../../components/UserInfomation/UserProfile";
import { Timeline } from "./Timeline";
import { microposts } from "../../urls";


export const Profile = ({
  isLoggedIn,
  match,
  loginUser,
}) => {
  const userId = props.match.params.id
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);

  const [profileState, profileDispatch] = useReducer(profileReducer, profileInitialState);
  const [tab, setTab] = useState(0);

  // ユーザー情報の取得
  const userInformation = () => {
    profileDispatch({ type: fetching });
    fetchUser({ userId: userId })
      .then(data => {
        profileDispatch({
          type: fetchProfileSuccess,
          payload: {
            user: data.user,
            followingIds: data.following_ids,
            followersIds: data.followiwea_ids,
            microposts: data.microposts,
          }
        })
        dataDispatch({ type: 'complete' })
      });
  }

  // マイクロポスト情報の取得 
  const userMicropost = () => {
    profileDispatch({ type: fetching });
    fetchUser({ userId: userId })
      .then(data => {
        profileDispatch({
          type: fetchMicropostSuccess,
          payload: {
            microposts: data.microposts,
            likedMicropostIds: data.liked_micropost_ids,
            comments: data.comments,
            commentedMicroposts: data.commented_microposts,
          }
        })
        dataDispatch({ type: 'complete' })
      });
  }

  useEffect(() => { userInformation() }, [dataState.user])
  useEffect(() => { userMicropost() }, [dataState.user])

  return (
    <Box sx={{
      p: 2,
      maxWidth: 800
    }}>
      <Box>
      </Box>
      <Grid container >
        <Grid item xs={12}>
          {/* <UserInfo 
          profile={profileState}
          loginUser={loginUser}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <SleepInfo /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <RecomendBook/> */}
        </Grid>
      </Grid>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={(event, newValue) => setTab(newValue)}
          >
            <Tab icon={<FavoriteIcon />} iconPosition="start" label="つぶやき" />
            <Tab icon={<FavoriteIcon />} iconPosition="start" label="いいね" />
            <Tab icon={<FavoriteIcon />} iconPosition="start" label="コメント" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {
            profileState.microposts.map(micropost =>
              <Microposts
                micropost={micropost}
                loginUser={loginUser}
                likedStatus={profile.likedMicropostIds.includes(micropost.id)}
              />
            )

          }
        </TabPanel>
        <TabPanel value={tab} index={1}>
          いいね
        </TabPanel>
        <TabPanel value={tab} index={2}>
          コメント
        </TabPanel>
      </Box>


      <UserProfile
        dataUserFetch={() => dataDispatch({ type: 'user' })}
        loginUser={props.loginUser}
        isLoggedIn={props.isLoggedIn}
        user={user}
        followingIds={followingIds}
        followersIds={followersIds}
      />

    </Box>
  )
}
