import React from "react";
// styles
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// コンポーネント
import { BookCard } from '../../components/Books/BookCard';

export const Mybooks = () => {
  const [value, setValue] = React.useState('read');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const BookCards = () => {
    return (
      <>
        <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <BookCard />
        </Grid>
        <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <BookCard />
        </Grid>
        <Grid item xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <BookCard />
        </Grid>
      </>
    )
  }

  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <h1>マイブック</h1>
      </Grid>

      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <h3>読んだ本（？？冊）</h3>
        <h3>積んでいる本（？？冊）</h3>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="読んだ本" value="read" />
              <Tab label="積んでいる本" value="stack" />
            </TabList>
          </Box>
          <TabPanel value="read">
            <BookCards />
          </TabPanel>
          <TabPanel value="stack">
            <BookCards />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid >
  )
}
