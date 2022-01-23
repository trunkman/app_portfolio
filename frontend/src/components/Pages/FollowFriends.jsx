import React, { useState, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router';
// Style
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
// Api
import { fetchFollowing } from '../../apis/users';
import { fetchFollowers } from '../../apis/users';
// Reducer
import { followInitialState, followReducer } from '../../reducer/FollowReducer';
// コンポーネント
import { FollowList } from '../Lists/FollowList';
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  alignItems: 'center',
  border: 1,
  justifyContent: 'center',
  maxWidth: 600,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const TitleWrapper = styled('box')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 5,
}));

const TitleTag = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 3,
}));

export const FollowFriends = ({ userId, initialTab }) => {
  const history = useHistory();
  const [tab, setTab] = useState(initialTab);
  const [followState, followDispatch] = useReducer(followReducer, followInitialState);

  // フォロー中のユーザーを取得する
  const Following = () => {
    fetchFollowing(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowing',
          payload: {
            following: data.following,
            user: data.user,
          },
        });
      });
  }

  // フォロワーを取得する
  const Followers = () => {
    fetchFollowers(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowers',
          payload: {
            followers: data.followers,
            user: data.user,
          },
        });
      });
  }

  useEffect(() => {
    followDispatch({ type: 'fetching' });
    tab === 'following' ? Following() : Followers()
  }, [tab, userId])

  return (
    <Container>
      <Typography>
        <Title>≪ フォローフレンド ≫<br /></Title>
      </Typography>
      <TitleWrapper>
        <Avatar
          src={followState.user.avatar_url}
          sx={{ cursor: 'pointer', height: 35, mt: 0.4, mx: 2, width: 35 }}
          onClick={() => history.push(`/users/${followState.user.id}`)}
        />
        <Typography>
          <TitleTag>{followState.user.name}</TitleTag>
        </Typography>
      </TitleWrapper>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
          >
            <Tab
              label="フォロー中"
              value="following"
              sx={{ typography: 'subtitle1', fontWeight: 'bold' }}
            />
            <Tab
              label="フォロワー"
              value="followers"
              sx={{ typography: 'subtitle1', fontWeight: 'bold' }}
            />
          </TabList>
        </Box>
        <TabPanel value="following">
          {followState.fetchState !== 'ok' && <Loading />}

          {followState.fetchState === 'ok' &&
            <FollowList
              tabStatus='following'
              users={followState.following}
            />
          }
        </TabPanel>
        <TabPanel value="followers">
          {followState.fetchState !== 'ok' && <Loading />}

          {followState.fetchState === 'ok' &&
            <FollowList
              tabStatus='followers'
              users={followState.followers}
            />
          }
        </TabPanel>
      </TabContext>
    </Container>
  )
}
