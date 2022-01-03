import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Component
import { BookCard } from '../Items/BookCard'

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

export const MyBookList = ({
  bookState,
  setTab,
  tab,
}) => {
  const tabLabelRead = `読了:${bookState.readBooks.length}冊`
  const tabLabelStack = `積読:${bookState.stackBooks.length}冊`

  return (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(event, newTab) => { setTab(newTab) }} >
            <Tab
              label={tabLabelRead}
              value="read"
              sx={{ typography: 'h6', fontWeight: 'bold', width: 150 }}
            />
            <Tab
              label={tabLabelStack}
              value="stack"
              sx={{ typography: 'h6', fontWeight: 'bold', width: 150 }}
            />
          </TabList>
        </Box>
        <TabPanel value="read">
          {bookState.readBooks.length === 0 ? (
            <Box sx={{ width: 1000 }}>
              <h3>読了した登録本はありません。</h3>
              <h3>睡眠本を読んで快適な睡眠生活を送ってみませんか？</h3>
            </Box>
          ) : (
            <List>
              {bookState.readBooks.map(book =>
                <ListItem key={book.isbn.toString()}>
                  <BookCard book={book} />
                </ListItem>
              )}
            </List>
          )}
        </TabPanel>
        <TabPanel value="stack">
          {bookState.stackBooks.length === 0 ? (
            <Box sx={{ width: 1000 }}>
              <h3>積んでいる登録本はありません。</h3>
              <h3>興味ある睡眠本は気軽に積みましょう。</h3>
            </Box>
          ) : (
            <List>
              {bookState.stackBooks.map(book =>
                <ListItem key={book.isbn.toString()}>
                  <BookCard book={book} />
                </ListItem>
              )}
            </List>
          )}
        </TabPanel>
      </TabContext>
    </>
  )
}
