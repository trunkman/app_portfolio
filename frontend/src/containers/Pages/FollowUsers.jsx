import React from "react";
// styles
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export const FollowUsers = () => {

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
          <p>フォロー中</p>

        </TabPanel>
        <TabPanel value="followers">
          <p>フォロワー</p>
        </TabPanel>
      </TabContext>
    </Box>

  )
}
