import React, { useState, useEffect, useReducer } from "react";
// Style
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from "@mui/material/Grid";
// Api
import { fetchUser, fetchMicroposts } from "../../apis/users";
// Reducer
import { dataInitialState, dataReducer } from '../../reducer/DataReducer';
import { profileInitialState, profileReducer } from '../../reducer/ProfileReducer';
// Component
import { UserInfo } from "../../components/UserInfomation/UserInfo";
import { Micropost } from "../../components/Lists/Micropost";


export const Profile = ({
  match,
  loginUser,
}) => {
  const userId = match.params.id
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);

  const [profileState, profileDispatch] = useReducer(profileReducer, profileInitialState);
  const [tab, setTab] = useState('microposts');

  // ユーザー情報の取得
  const userInformation = () => {
    fetchUser(userId)
      .then(data => {
        profileDispatch({
          type: 'fetchSuccessProfile',
          payload: {
            user: data.user,
            followingIds: data.following_ids,
            followersIds: data.followers_ids,
          }
        })
        dataDispatch({ type: 'complete' })
      });
  }

  // マイクロポスト情報の取得 
  const userMicropost = () => {
    fetchMicroposts(userId)
      .then(data => {
        profileDispatch({
          type: 'fetchSuccessMicropost',
          payload: {
            microposts: data.microposts,
            likedMicroposts: data.liked_microposts,
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
      maxWidth: 800,
      p: 2,
    }}>
      <Box>
      </Box>
      <Grid container >
        <Grid item xs={12}>
          <UserInfo
            loginUser={loginUser}
            profile={profileState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <SleepInfo /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <RecomendBook/> */}
        </Grid>
      </Grid>
      <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, newTab) => setTab(newTab)} >
              <Tab icon={<FavoriteIcon />}
                iconPosition="start"
                label="つぶやき"
                value="microposts"
              />
              <Tab
                icon={<FavoriteIcon />}
                iconPosition="start"
                label="いいね"
                value="liked_microposts"
              />
              <Tab
                icon={<FavoriteIcon />}
                iconPosition="start"
                label="コメント"
                value="comments"
              />
            </TabList>
          </Box>
          <TabPanel value="microposts" index={0}>
            {
              profileState.microposts.map(micropost =>
                <Micropost
                  micropost={micropost}
                  loginUser={loginUser}
                  likedStatus={
                    false
                    // profileState.likedMicropostIds.includes(micropost.id)
                  }
                />
              )
            }
          </TabPanel>
          <TabPanel value="liked_microposts" index={1}>
            {
              profileState.likedMicroposts.map(micropost =>
                <Micropost
                  micropost={micropost}
                  loginUser={loginUser}
                  likedStatus={true}
                />
              )
            }
          </TabPanel>
          <TabPanel value="comments" index={2}>

          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
