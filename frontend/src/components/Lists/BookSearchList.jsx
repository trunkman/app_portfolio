import React from "react";
import InfiniteScroll from "react-infinite-scroller"
// Style
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Component
import { BookCard } from '../Items/BookCard';
import Loading from "../Items/Loading";

const BookList = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
}));

export const BookSearchList = ({
  hasMore,
  searchList,
  loadMore,
}) => {
  const loader = <Loading />

  return (
    <TabContext value='search'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList>
          <Tab
            label='検索結果'
            value="search"
            sx={{ typography: 'h6', fontWeight: 'bold', width: 300 }}
          />
        </TabList>
      </Box>
      <TabPanel value="search">
        <InfiniteScroll
          hasMore={hasMore}
          loader={loader}
          loadMore={loadMore}
          pageStart={1}
          useWindow='false'
        >
          <BookList container spacing={2}>
            {searchList.map(book =>
              <Grid
                item sm={6} md={3}
                key={book.params.isbn.toString()}
                display='flex'
                justifyContent='center'
              >
                <BookCard book={book.params} />
              </Grid>
            )}
          </BookList>
        </InfiniteScroll>
      </TabPanel>
    </TabContext>
  )
}
