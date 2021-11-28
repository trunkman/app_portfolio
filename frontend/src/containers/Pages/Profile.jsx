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
import { profileInitialState, profileReducer } from '../../reducer/ProfileReducer';
// Component
import { UserInfo } from "../../components/UserInfomation/UserInfo";
import { Micropost } from "../../components/Lists/Micropost";
import { Comment } from "../../components/Lists/Comment";
import { Loading } from "../../components/Loading"


export const Profile = ({
  userId,
  loginUser,
}) => {
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
            followStatus: data.followStatus,
          }
        })
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
          }
        })
      });
  }

  useEffect(() => { userInformation() }, [])
  useEffect(() => { userMicropost() }, [tab])

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
            <TabList
              onChange={(event, newTab) => setTab(newTab)}
              variant="fullWidth"
            >
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
              profileState.fetchState != 'ok' ? <Loading /> :
                profileState.microposts.map(micropost =>
                  <Micropost
                    commentCount={micropost.commentCount}
                    likeStatus={micropost.likeStatus}
                    loginUser={loginUser}
                    micropost={micropost.micropost}
                  />
                )
            }
          </TabPanel>
          <TabPanel value="liked_microposts" index={1}>
            {
              profileState.fetchState != 'ok' ? <Loading /> :
                profileState.likedMicroposts.map(micropost =>
                  <Micropost
                    commentCount={micropost.commentCount}
                    likeStatus={micropost.likeStatus}
                    loginUser={loginUser}
                    micropost={micropost.liked_micropost}
                  />
                )
            }
          </TabPanel>
          <TabPanel value="comments" index={2}>
            {
              profileState.fetchState != 'ok' ? <Loading /> :
                profileState.comments.map(comment =>
                  <Comment
                    comment={comment}
                    loginUser={loginUser}
                    userName={profileState.user.name}
                  />
                )
            }
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
