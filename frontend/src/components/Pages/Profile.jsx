import React, { useContext, useState, useEffect, useReducer } from "react";
import { AuthContext } from '../../App';
// Style
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from "@mui/material/List";
import { styled } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//Icon
import CommentIcon from '@mui/icons-material/Comment';
import NotesIcon from '@mui/icons-material/Notes';
// Api
import { fetchUser, fetchMicroposts } from "../../apis/users";
// Reducer

import { profileReducer, profileInitialState } from '../../reducer/ProfileReducer';
// Component
import { Comment } from "../../components/Lists/Comment";
import { Loading } from "../Items/Loading"
import { Micropost } from "../Items/Micropost";
import { UserInfo } from "../UserInfomations/UserInfo";
import { Typography } from "@mui/material";

const Container = styled('box')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 800,
  mx: 'auto',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));

export const Profile = ({
  userId,
}) => {
  const { authState } = useContext(AuthContext);
  const [profileState, profileDispatch] = useReducer(profileReducer, profileInitialState);
  const [tab, setTab] = useState('microposts');
  const [open, setOpen] = useState(false);

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
            subscriptions: data.subscriptions,
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


  useEffect(() => { userInformation() }, [open])
  useEffect(() => { userMicropost() }, [tab])

  return (
    <Container>
      <Typography variant="h2">
        <Title>≪ プロフィール ≫</Title>
      </Typography>
      <UserInfo
        open={open}
        setOpen={setOpen}
        loginUser={authState.loginUser}
        profileState={profileState}
      />
      <Box px={{ width: '100%' }}>
        <TabContext value={tab}>
          <Box>
            <TabList
              onChange={(event, newTab) => setTab(newTab)}
              variant="fullWidth"
            >
              <Tab
                icon={<NotesIcon />}
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
                icon={<CommentIcon />}
                iconPosition="start"
                label="コメント"
                value="comments"
              />
            </TabList>
          </Box>
          <TabPanel value="microposts" index={0}>
            <List>
              {
                profileState.fetchState !== 'ok' ? <Loading /> :
                  profileState.microposts.map(micropost =>
                    <Micropost
                      commentCount={micropost.commentCount}
                      likeStatus={micropost.likeStatus}
                      micropost={micropost.micropost}
                      user={profileState.user}
                    />
                  )
              }
            </List>
          </TabPanel>
          <TabPanel value="liked_microposts" index={1}>
            <List>
              {
                profileState.fetchState !== 'ok' ? <Loading /> :
                  profileState.likedMicroposts.map(micropost =>
                    <Micropost
                      commentCount={micropost.commentCount}
                      likeStatus={micropost.likeStatus}
                      micropost={micropost.liked_micropost}
                      user={micropost.user}
                    />
                  )
              }
            </List>
          </TabPanel>
          <TabPanel value="comments" index={2}>
            <List>
              {
                profileState.fetchState !== 'ok' ? <Loading /> :
                  profileState.comments.map(comment =>
                    <Comment
                      comment={comment}
                      user={profileState.user}
                    />
                  )
              }
            </List>
          </TabPanel>
        </TabContext>
      </Box>
    </Container >
  )
}
