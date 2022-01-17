import React from "react";
// Style
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Component
import { BookCard } from '../Items/BookCard'

const BookList = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
}));

export const BookMyList = ({
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
          {bookState.readBooks.length === 0 &&
            <Box>
              <h3>
                良い睡眠本はたくさんあるので、<br />
                読んで快適な睡眠生活を送りましょう。
              </h3>
            </Box>
          }

          {bookState.readBooks.length !== 0 &&
            <BookList container spacing={2}>
              {bookState.readBooks.map(book =>
                <Grid
                  item sm={6} md={3}
                  key={book.isbn.toString()}
                  display='flex'
                  justifyContent='center'
                >
                  <BookCard book={book} />
                </Grid>
              )}
            </BookList>
          }
        </TabPanel>
        <TabPanel value="stack">
          {bookState.stackBooks.length === 0 &&
            <Box>
              <h3>
                興味ある睡眠本はここに積んで、<br />
                読むのを忘れないようにしましょう。
              </h3>
            </Box>
          }

          {bookState.stackBooks.length !== 0 &&
            <BookList container spacing={2}>
              {bookState.stackBooks.map(book =>
                <Grid
                  item sm={6} md={3}
                  key={book.isbn.toString()}
                  display='flex'
                  justifyContent='center'
                >
                  <BookCard book={book} />
                </Grid>
              )}
            </BookList>
          }
        </TabPanel>
      </TabContext>
    </>
  )
}
