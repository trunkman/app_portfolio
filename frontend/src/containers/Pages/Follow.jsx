import React, { useState, useReducer, useEffect } from "react";
// styles
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Api
import { fetchFollowing } from "../../apis/users";
import { fetchFollowers } from "../../apis/users";
// Reducer
import { followInitialState, followReducer } from '../../reducer/FollowReducer';
// コンポーネント
import { FollowList } from '../../components/Lists/FollowList';
import { Loading } from '../../components/Loading';

export const Follow = (props) => {
  const userId = props.match.params.id
  const [tab, setTab] = useState('following');
  const [followState, followDispatch] = useReducer(followReducer, followInitialState);

  // フォロー中のユーザーを取得する
  const Following = () => {
    fetchFollowing(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowing',
          payload: {
            following: data.following,
          }
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
          }
        });
      });
  }

  useEffect(() => {
    followDispatch({ type: 'fetching' });
    newTab == 'following' ? Following() : Followers()
  }, [tab])


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(event, newTab) => { setTab(newTab) }} >
            <Tab label="フォロー中" value="following" />
            <Tab label="フォロワー" value="followers" />
          </TabList>
        </Box>
        <TabPanel value="following">
          {
            followState.fetchState != 'ok' ? <Loading /> :
              followState.following.map(followerd =>
                <FollowList
                  user={followed.user}
                  followStatus={followerd.id == followerd.follower_id}
                />
              )
          }
        </TabPanel>
        <TabPanel value="followers">
          {
            followState.fetchState != 'ok' ? <Loading /> :
              followState.followers.map(follower =>
                <FollowList
                  user={follower}
                  followerId={follower.id == follower.follower_id}
                />
              )
          }
        </TabPanel>
      </TabContext>
    </Box>

  )
}
