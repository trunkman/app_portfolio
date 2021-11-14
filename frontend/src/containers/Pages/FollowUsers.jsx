import React, { useState } from "react";
// styles
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//api

// コンポーネント
import { Following } from '../../components/Users/Following';
import { Followers } from '../../components/Users/Followers';

export const FollowUsers = (props) => {
  const userId = props.match.params.id
  // タブ機能
  const [value, setValue] = useState('following');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="フォロー中" value="following" />
            <Tab label="フォロワー" value="followers" />
          </TabList>
        </Box>
        <TabPanel value="following">
          <Following
            userId={userId}
          />
        </TabPanel>
        <TabPanel value="followers">
          <Followers
            userId={userId}
          />
        </TabPanel>
      </TabContext>
    </Box>

  )
}
