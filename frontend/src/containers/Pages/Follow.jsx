import React, { useState, useReducer, useEffect } from "react";
// styles
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
// Api
import { fetchFollowing } from "../../apis/users";
import { fetchFollowers } from "../../apis/users";
// Reducer
import { followInitialState, followReducer } from '../../reducer/FollowReducer';
// コンポーネント
import { FollowList } from '../../components/Lists/FollowList';
import { Loading } from '../../components/Loading';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    border: 1,
    justifyContent: 'center',
    maxWidth: 600,
    textAlign: 'center',
    width: '100%',
  },
  tabBox: {
    background: '#001e3c',
    borderBottom: 1,
    borderColor: 'divider',
    '&:hover': {
      color: '#fff',
      fontWeight: 'bold',
    },
  },
}));

export const Follow = ({
  userId,
  initialTab,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(initialTab);
  const [followState, followDispatch] = useReducer(followReducer, followInitialState);
  // フォロー中のユーザーを取得する
  const Following = () => {
    fetchFollowing(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowing',
          payload: { following: data.following },
        });
      });
  }
  // フォロワーを取得する
  const Followers = () => {
    fetchFollowers(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowers',
          payload: { followers: data.followers },
        });
      });
  }

  useEffect(() => {
    followDispatch({ type: 'fetching' });
    tab === 'following' ? Following() : Followers()
  }, [tab])

  return (
    <Box className={classes.root}>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Box sx={{ letterSpacing: 10, pb: 2 }}><b> test</b></Box>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label="フォロー中"
              value="following"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="フォロワー"
              value="followers"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
          </TabList>
        </Box>
        <TabPanel value="following">
          {
            followState.fetchState != 'ok' ? <Loading /> :
              followState.following.map(followed =>
                <FollowList
                  user={followed.user}
                  followStatus={followed.followStatus}
                />
              )
          }
        </TabPanel>
        <TabPanel value="followers">
          {
            followState.fetchState != 'ok' ? <Loading /> :
              followState.followers.map(follower =>
                <FollowList
                  user={follower.user}
                  followStatus={follower.followStatus}
                />
              )
          }
        </TabPanel>
      </TabContext>
    </Box>

  )
}
