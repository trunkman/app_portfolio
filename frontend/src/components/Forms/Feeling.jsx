import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Emoji } from 'emoji-mart';

export const Feeling = ({ feeling, recordDispatch }) => {

  // タブ切り替え
  const tabChange = (event, newValue) => {
    recordDispatch({
      type: 'feeling',
      payload: newValue,
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      <p>睡眠状態</p>
      <Tabs
        value={feeling}
        onChange={tabChange}
      >
        <Tab
          value="satisfied"
          label={<Emoji emoji="satisfied" size={32} />}
          wrapped
        />
        <Tab
          value="neutral_face"
          label={<Emoji emoji="neutral_face" size={32} />}
        />
        <Tab
          value="dizzy_face"
          label={<Emoji emoji="dizzy_face" size={32}
          />} />
      </Tabs>
    </Box>
  )
}
