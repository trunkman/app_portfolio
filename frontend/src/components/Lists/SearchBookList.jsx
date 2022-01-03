import React from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Component
import { BookCard } from '../Items/BookCard';

const List = styled('box')(({ theme }) => ({
  background: '#334b63',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: 1000,
}));

const ListItem = styled('box')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 250,
  height: 385,
  padding: 15,
}));

export const SearchBookList = ({ bookState }) => {
  const tabLabelSearch = `検索結果:${bookState.searchBooks.length}冊`

  return (
    <TabContext value='search'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList>
          <Tab
            label={tabLabelSearch}
            value="search"
            sx={{ typography: 'h6', fontWeight: 'bold', width: 200 }}
          />
        </TabList>
      </Box>
      <TabPanel value="search">
        <List>
          {bookState.searchBooks.map(book =>
            <ListItem key={book.params.isbn.toString()}>
              <BookCard book={book.params} />
            </ListItem>
          )}
        </List>
      </TabPanel>
    </TabContext>
  )
}
