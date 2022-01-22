import React from 'react';
// Component
import { RankBookItem } from '../Items/RankBookItem';
// Style
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'

const ListWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
}));

export const RankBookList = ({ books }) => {

  return (
    <ListWrapper container spacing={2}>
      {
        books.map(book =>
          <Grid
            item sm={6} md={4}
            key={book.book.isbn.toString()}
            display='flex'
            justifyContent='center'
          >
            <RankBookItem
              book={book.book}
              rank={book.rank}
              countStack={book.count}
            />
          </Grid>
        )
      }
    </ListWrapper>
  );
}
